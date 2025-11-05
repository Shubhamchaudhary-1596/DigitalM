const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digitalmax', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Client = mongoose.model('Client', {
  name: { type: String, required: true },
  logo: String,
  website: String,
  industry: String,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Routes

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    
    // Here you would typically send an email notification
    // using nodemailer or another email service
    
    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      id: contact._id 
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(400).json({ error: error.message });
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

// Get portfolio items
app.get('/api/portfolio', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = {};
    
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

// Newsletter subscription
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Here you would typically integrate with an email service
    // like Mailchimp, SendGrid, or similar
    
    res.status(201).json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Default route
app.get('/', (req, res) => {
  res.json({ 
    message: 'DigitalMax API Server',
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
  console.log(`MongoDB connected to: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/digitalmax'}`);
});

module.exports = app;