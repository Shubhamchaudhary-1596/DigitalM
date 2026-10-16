import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { isValidEmail, isValidSlug } from './lib/validation.js';
import userRouter from './routes/user.route.js';
import leadRouter from './routes/lead.route.js';
import blogRouter from './routes/blog.route.js';
import categoryRouter from './routes/category.route.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:5174').split(',').map((origin) => origin.trim()).filter(Boolean);
app.use(cors({ origin(origin, callback) { if (!origin || allowedOrigins.includes(origin)) return callback(null, true); return callback(new Error('Origin is not allowed by CORS')); } }));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URL || 'mongodb://localhost:27017/webzoneo').then(() => console.log('MongoDB connected')).catch((error) => { console.error('MongoDB connection failed:', error.message); process.exit(1); });

// Models
const Contact = mongoose.model('Contact', {
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  service: String,
  budget: String,
  timeline: String,
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Testimonial = mongoose.model('Testimonial', {
  name: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  image: String,
  rating: { type: Number, min: 1, max: 5, default: 5 },
  text: { type: String, required: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const PortfolioItem = mongoose.model('PortfolioItem', {
  title: { type: String, required: true },
  client: { type: String, required: true },
  category: { type: String, required: true },
  industry: String,
  description: { type: String, required: true },
  image: String,
  results: [{
    label: String,
    value: String,
    icon: String,
  }],
  challenges: [String],
  solutions: [String],
  timeline: String,
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Subscriber = mongoose.model('Subscriber', { email: { type: String, required: true, unique: true, lowercase: true, trim: true }, createdAt: { type: Date, default: Date.now } });

const Client = mongoose.model('Client', {
  name: { type: String, required: true },
  logo: String,
  website: String,
  industry: String,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.models.WebzoneoBlog || mongoose.model('WebzoneoBlog', {
  title: { type: String, required: true, trim: true, maxlength: 180 },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  excerpt: { type: String, required: true, maxlength: 500 },
  content: { type: String, required: true, maxlength: 50000 },
  category: { type: String, required: true, maxlength: 80 },
  author: { type: String, required: true, maxlength: 120 },
  image: String,
  tags: [String],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  featured: { type: Boolean, default: false },
  publishedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Service = mongoose.models.WebzoneoService || mongoose.model('WebzoneoService', {
  title: { type: String, required: true, trim: true, maxlength: 160 },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true, maxlength: 3000 },
  features: [{ type: String, maxlength: 160 }],
  category: { type: String, required: true, maxlength: 80 },
  price: { type: String, maxlength: 160 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Existing application routes remain available alongside the Webzoneo content API.
app.use('/api/user', userRouter);
app.use('/api/lead', leadRouter);
app.use('/api/blog', blogRouter);
app.use('/api/category', categoryRouter);

// Routes
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });
const requireAdmin = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token || !process.env.JWT_SECRET) return res.status(401).json({ error: 'Authentication required' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, { issuer: 'webzoneo-api', audience: 'webzoneo-admin' });
    if (payload.role !== 'admin') return res.status(403).json({ error: 'Administrator access required' });
    req.admin = payload;
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH || !process.env.JWT_SECRET) return res.status(503).json({ error: 'Admin authentication is not configured on the server' });
  try {
    const matches = email === process.env.ADMIN_EMAIL.trim().toLowerCase() && await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!matches) return res.status(401).json({ error: 'Invalid email or password' });
    const user = { id: 'configured-admin', name: 'Administrator', email, role: 'admin' };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '8h', issuer: 'webzoneo-api', audience: 'webzoneo-admin' });
    return res.json({ token, user });
  } catch (error) {
    console.error('Admin login error:', error.message);
    return res.status(500).json({ error: 'Unable to sign in at this time' });
  }
});
app.post('/api/auth/register', (req, res) => res.status(403).json({ error: 'Public registration is disabled. Ask the site administrator to provision access.' }));
app.post('/api/auth/forgot-password', (req, res) => res.status(503).json({ error: 'Password reset email is not configured. Contact the site administrator.' }));

// Public, published content endpoints.
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' }).sort({ publishedAt: -1, createdAt: -1 }).select('-content').lean();
    res.json(blogs);
  } catch (error) {
    console.error('Public blogs error:', error.message);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});
app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' }).lean();
    if (!blog) return res.status(404).json({ error: 'Article not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});
app.get('/api/services', async (req, res) => {
  try { res.json(await Service.find({ active: true }).sort({ title: 1 }).lean()); }
  catch (error) { res.status(500).json({ error: 'Failed to fetch services' }); }
});
app.get('/api/services/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, active: true }).lean();
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (error) { res.status(500).json({ error: 'Failed to fetch service' }); }
});

// Authenticated content management API.
const validateSlug = isValidSlug;
app.get('/api/admin/blogs', requireAdmin, async (req, res) => {
  try { res.json(await Blog.find().sort({ updatedAt: -1 }).lean()); }
  catch (error) { res.status(500).json({ error: 'Failed to fetch blog posts' }); }
});
app.post('/api/admin/blogs', requireAdmin, async (req, res) => {
  try {
    const data = req.body || {};
    if (!data.title || !validateSlug(data.slug) || !data.excerpt || !data.content || !data.category || !data.author) return res.status(400).json({ error: 'Title, valid slug, excerpt, content, category and author are required' });
    const status = data.status === 'published' ? 'published' : 'draft';
    const blog = await Blog.create({ title: data.title, slug: data.slug, excerpt: data.excerpt, content: data.content, category: data.category, author: data.author, image: data.image || '', tags: Array.isArray(data.tags) ? data.tags.filter((tag) => typeof tag === 'string').slice(0, 20) : [], featured: Boolean(data.featured), status, publishedAt: status === 'published' ? new Date() : undefined });
    res.status(201).json(blog);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: 'That blog slug is already in use' });
    res.status(400).json({ error: 'Unable to create blog post' });
  }
});
app.put('/api/admin/blogs/:id', requireAdmin, async (req, res) => {
  try {
    const data = req.body || {};
    if (data.slug !== undefined && !validateSlug(data.slug)) return res.status(400).json({ error: 'Slug must contain lowercase letters, numbers and hyphens only' });
    const update = { ...data, updatedAt: new Date() };
    delete update._id; delete update.__v; delete update.createdAt;
    if (update.status === 'published') update.publishedAt = new Date();
    const blog = await Blog.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ error: 'Blog post not found' });
    res.json(blog);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: 'That blog slug is already in use' });
    res.status(400).json({ error: 'Unable to update blog post' });
  }
});
app.delete('/api/admin/blogs/:id', requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog post not found' });
    res.status(204).end();
  } catch (error) { res.status(400).json({ error: 'Unable to delete blog post' }); }
});
app.get('/api/admin/services', requireAdmin, async (req, res) => {
  try { res.json(await Service.find().sort({ title: 1 }).lean()); }
  catch (error) { res.status(500).json({ error: 'Failed to fetch services' }); }
});
app.post('/api/admin/services', requireAdmin, async (req, res) => {
  try {
    const data = req.body || {};
    if (!data.title || !validateSlug(data.slug) || !data.description || !data.category) return res.status(400).json({ error: 'Title, valid slug, description and category are required' });
    const service = await Service.create({ title: data.title, slug: data.slug, description: data.description, category: data.category, price: data.price || '', features: Array.isArray(data.features) ? data.features.filter((item) => typeof item === 'string').slice(0, 30) : [], active: data.active !== false });
    res.status(201).json(service);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: 'That service slug is already in use' });
    res.status(400).json({ error: 'Unable to create service' });
  }
});
app.put('/api/admin/services/:id', requireAdmin, async (req, res) => {
  try {
    const data = req.body || {};
    if (data.slug !== undefined && !validateSlug(data.slug)) return res.status(400).json({ error: 'Slug must contain lowercase letters, numbers and hyphens only' });
    const update = { ...data, updatedAt: new Date() };
    delete update._id; delete update.__v; delete update.createdAt;
    const service = await Service.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: 'That service slug is already in use' });
    res.status(400).json({ error: 'Unable to update service' });
  }
});
app.delete('/api/admin/services/:id', requireAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.status(204).end();
  } catch (error) { res.status(400).json({ error: 'Unable to delete service' }); }
});

// Authenticated portfolio management API.
app.get('/api/admin/portfolio', requireAdmin, async (req, res) => {
  try { res.json(await PortfolioItem.find().sort({ createdAt: -1 }).lean()); }
  catch (error) { res.status(500).json({ error: 'Failed to fetch portfolio items' }); }
});
app.post('/api/admin/portfolio', requireAdmin, async (req, res) => {
  try {
    const data = req.body || {};
    if (!data.title || !data.client || !data.category || !data.description || !validateSlug(data.slug)) return res.status(400).json({ error: 'Title, client, category, description and valid slug are required' });
    const item = await PortfolioItem.create({
      title: data.title, client: data.client, slug: data.slug, category: data.category,
      industry: data.industry || '', description: data.description, image: data.image || '',
      timeline: data.timeline || '', featured: Boolean(data.featured), published: Boolean(data.published),
      challenges: Array.isArray(data.challenges) ? data.challenges.filter((v) => typeof v === 'string').slice(0, 30) : [],
      solutions: Array.isArray(data.solutions) ? data.solutions.filter((v) => typeof v === 'string').slice(0, 30) : [],
      results: Array.isArray(data.results) ? data.results.filter((v) => v && typeof v.label === 'string' && typeof v.value === 'string').slice(0, 20) : []
    });
    res.status(201).json(item);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: 'That case-study slug is already in use' });
    res.status(400).json({ error: 'Unable to create case study' });
  }
});
app.put('/api/admin/portfolio/:id', requireAdmin, async (req, res) => {
  try {
    const data = req.body || {};
    if (data.slug !== undefined && !validateSlug(data.slug)) return res.status(400).json({ error: 'Slug must contain lowercase letters, numbers and hyphens only' });
    const allowed = ['title','client','slug','category','industry','description','image','timeline','featured','published','challenges','solutions','results'];
    const update = {};
    for (const key of allowed) if (data[key] !== undefined) update[key] = data[key];
    const item = await PortfolioItem.findByIdAndUpdate(req.params.id, { ...update, updatedAt: new Date() }, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ error: 'Case study not found' });
    res.json(item);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: 'That case-study slug is already in use' });
    res.status(400).json({ error: 'Unable to update case study' });
  }
});
app.delete('/api/admin/portfolio/:id', requireAdmin, async (req, res) => {
  try {
    const item = await PortfolioItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Case study not found' });
    res.status(204).end();
  } catch (error) { res.status(400).json({ error: 'Unable to delete case study' }); }
});

// Contact form submission
app.post('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: true, legacyHeaders: false }), async (req, res) => {
  try {

    const fields = ['name', 'email', 'phone', 'company', 'service', 'budget', 'timeline', 'message'];
    const input = {};
    for (const field of fields) {
      const value = req.body?.[field];
      if (value !== undefined && typeof value !== 'string') return res.status(400).json({ error: 'Invalid ' + field + ' value' });
      input[field] = typeof value === 'string' ? value.trim() : '';
    }
    if (!input.name || input.name.length > 120) return res.status(400).json({ error: 'Name is required and must be under 120 characters' });
    if (!isValidEmail(input.email)) return res.status(400).json({ error: 'A valid email address is required' });
    if (!input.message || input.message.length > 5000) return res.status(400).json({ error: 'Message is required and must be under 5000 characters' });
    for (const field of fields) if (input[field].length > (field === 'message' ? 5000 : 500)) return res.status(400).json({ error: field + ' is too long' });
    const contact = new Contact(input);
    await contact.save();
    
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === 'true',
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        });
        await transporter.sendMail({
          from: process.env.CONTACT_FROM_EMAIL,
          to: process.env.CONTACT_TO_EMAIL,
          replyTo: contact.email,
          subject: 'New Webzoneo website enquiry',
          text: ['Name: ' + contact.name, 'Email: ' + contact.email, 'Phone: ' + (contact.phone || 'Not provided'), 'Company: ' + (contact.company || 'Not provided'), 'Service: ' + (contact.service || 'Not provided'), 'Budget: ' + (contact.budget || 'Not provided'), 'Timeline: ' + (contact.timeline || 'Not provided'), '', contact.message].join('\n')
        });
      } catch (mailError) {
        console.error('Contact saved but notification email failed:', mailError.message);
      }
    } else {
      console.warn('Contact saved, but SMTP notification is not configured.');
    }

    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      id: contact._id 
    });
  } catch (error) {
    console.error('Contact submission error:', error.message);
    if (error.name === 'ValidationError') return res.status(400).json({ error: 'Some contact fields are invalid. Check them and try again.' });
    res.status(500).json({ error: 'Unable to save your enquiry right now. Please try again later.' });
  }
});

// Admin-only lead inbox.
app.get('/api/contacts', requireAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(200).lean();
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error.message);
    res.status(500).json({ error: 'Failed to fetch contact enquiries' });
  }
});

// Get testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Get clients
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await Client.find({ active: true })
      .sort({ name: 1 });
    res.json(clients);
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});

app.get('/api/portfolio/:slug', async (req, res) => {
  try {
    const item = await PortfolioItem.findOne({ slug: req.params.slug, published: true }).lean();
    if (!item) return res.status(404).json({ error: 'Case study not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch case study' });
  }
});

// Get portfolio items
app.get('/api/portfolio', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = { published: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    const portfolioItems = await PortfolioItem.find(query)
      .sort({ createdAt: -1 });
    res.json(portfolioItems);
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio items' });
  }
});

// Newsletter subscription. Collect consent in the UI before calling this endpoint.
app.post('/api/subscribe', rateLimit({ windowMs: 60 * 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false }), async (req, res) => {
  try {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'A valid email address is required' });
    }
    try {
      await Subscriber.create({ email });
      return res.status(201).json({ message: 'Subscription saved successfully' });
    } catch (error) {
      if (error.code === 11000) return res.status(200).json({ message: 'This email is already subscribed' });
      throw error;
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error.message);
    res.status(500).json({ error: 'Failed to save subscription' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbReady = mongoose.connection.readyState === 1;
  res.status(dbReady ? 200 : 503).json({ status: dbReady ? 'OK' : 'DEGRADED', database: dbReady ? 'connected' : 'disconnected', timestamp: new Date().toISOString() });
});

app.get('/sitemap.xml', async (req, res) => {
  try {
    const base = (process.env.PUBLIC_SITE_URL || 'https://webzoneo.com').replace(/\/$/, '');
    const staticPaths = ['', '/services', '/about', '/work', '/blog', '/contact', '/services/seo', '/services/ppc', '/services/social-media', '/services/web-development', '/services/content-marketing', '/services/analytics'];
    const [services, blogs, portfolio] = await Promise.all([
      Service.find({ active: true }).select('slug updatedAt').lean(),
      Blog.find({ status: 'published' }).select('slug updatedAt publishedAt').lean(),
      PortfolioItem.find({ published: true }).select('slug updatedAt').lean()
    ]);
    const urls = new Set(staticPaths.map((path) => base + path));
    services.forEach((item) => urls.add(base + '/services/' + encodeURIComponent(item.slug)));
    blogs.forEach((item) => urls.add(base + '/blog/' + encodeURIComponent(item.slug)));
    portfolio.forEach((item) => urls.add(base + '/work/' + encodeURIComponent(item.slug)));
    const xmlEscape = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
    const body = Array.from(urls).map((url) => '<url><loc>' + xmlEscape(url) + '</loc></url>').join('');
    res.type('application/xml').send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + body + '</urlset>');
  } catch (error) {
    console.error('Sitemap generation error:', error.message);
    res.status(500).type('text/plain').send('Sitemap generation failed');
  }
});

// Default route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Webzoneo API Server',
    version: '1.0.0',
    status: 'Running'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('MongoDB configured: ' + (process.env.MONGODB_URI ? 'custom URI' : 'local default URI'));
});

export default app;