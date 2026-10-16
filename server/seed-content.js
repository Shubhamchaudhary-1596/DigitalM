import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

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

const services = [
  { title: 'SEO Services', slug: 'seo', category: 'SEO', description: 'Improve technical health, page relevance and useful content so customers can find your business through search.', features: ['Technical SEO audit','Keyword and search-intent research','On-page optimization','Content planning','Local SEO where relevant','Search performance reporting'] },
  { title: 'Paid Advertising (PPC)', slug: 'ppc', category: 'PPC', description: 'Plan and optimize paid search and social campaigns around clear business goals, conversion tracking and transparent reporting.', features: ['Campaign strategy and setup','Keyword and audience research','Ad copy and creative testing','Landing page review','Conversion tracking','Budget and performance reporting'] },
  { title: 'Social Media Marketing', slug: 'social-media', category: 'Social Media', description: 'Create a channel plan, publish relevant content and measure engagement and business outcomes across the social platforms that matter to your audience.', features: ['Channel and audience strategy','Content calendar','Creative direction','Community response guidelines','Paid social coordination','Monthly reporting'] },
  { title: 'Web Development', slug: 'web-development', category: 'Web Development', description: 'Design and develop responsive websites and landing pages with clear user journeys, maintainable code and search-friendly foundations.', features: ['Responsive page development','Landing pages','Accessibility review','Performance optimization','Analytics integration','Technical handover'] },
  { title: 'Content Marketing', slug: 'content-marketing', category: 'Content Marketing', description: 'Plan and produce content that supports customer research, search visibility and conversion journeys instead of publishing for volume alone.', features: ['Content and topic research','Editorial calendar','Blog and landing-page copy','Content refreshes','Internal-link planning','Performance measurement'] },
  { title: 'Analytics & Reporting', slug: 'analytics', category: 'Analytics', description: 'Set up clear measurement plans and reporting so marketing activity can be evaluated against meaningful business outcomes.', features: ['Analytics configuration review','Conversion event planning','Campaign tagging guidance','Dashboard requirements','Data quality checks','Monthly insights and next steps'] }
];
const blogs = [
  { title: 'A Practical SEO Audit Checklist for Business Websites', slug: 'practical-seo-audit-checklist', category: 'SEO', excerpt: 'A step-by-step review of crawling, indexing, page quality, internal links and measurement before investing more in SEO.', author: 'Webzoneo Editorial Team', tags: ['SEO','Technical SEO'], status: 'published', publishedAt: new Date('2026-10-15'), content: 'Start with crawling and indexing\n\nCheck whether important pages return successful responses and can be discovered through internal links. Review robots directives, canonical URLs and sitemap coverage together rather than treating the sitemap as a guarantee of indexing.\n\nReview page intent and usefulness\n\nMap each important page to one clear customer need. Make titles and headings descriptive, explain the service in plain language, answer likely questions and provide a relevant next step.\n\nCheck technical quality\n\nTest mobile layouts, page loading, broken links, image alternatives, redirects and error pages. Confirm that each indexable page has a sensible title and description, a canonical URL and links to related content.\n\nMeasure outcomes\n\nRecord a baseline for relevant organic clicks, qualified enquiries and conversion rate. Prioritize fixes by likely impact, effort and confidence. SEO outcomes vary by competition, site history and implementation.' },
  { title: 'Conversion Tracking: What to Measure Before Running Ads', slug: 'conversion-tracking-basics', category: 'Analytics', excerpt: 'Define lead and sales events, test the complete journey and avoid optimizing campaigns against unreliable data.', author: 'Webzoneo Editorial Team', tags: ['Analytics','PPC'], status: 'published', publishedAt: new Date('2026-10-15'), content: 'Define a meaningful conversion\n\nChoose actions that represent business value: a valid enquiry, a qualified booking or a completed purchase. Page views and button clicks can help diagnose behavior, but they are not always business conversions.\n\nInstrument the full journey\n\nUse consistent campaign tagging and configure analytics events with clear names and parameters. Where possible, connect form submissions to a confirmed server response rather than firing a conversion when a button is clicked.\n\nTest before spending\n\nSubmit a test lead, confirm the backend accepts it, and verify the event appears once in the appropriate debugging tools. Compare analytics conversions with CRM or backend records.' },
  { title: 'Local SEO for Businesses Serving Multiple Markets', slug: 'local-seo-for-multi-market-businesses', category: 'SEO', excerpt: 'Build trustworthy local visibility while keeping location pages, business details and international targeting consistent.', author: 'Webzoneo Editorial Team', tags: ['Local SEO','International SEO'], status: 'published', publishedAt: new Date('2026-10-15'), content: 'Keep business information accurate\n\nUse the real business name, address and phone number wherever those details are displayed. Claim eligible business profiles and keep hours, categories and service information current. Do not create fake offices or profiles in locations where the business is not genuinely eligible.\n\nMake location pages genuinely useful\n\nCreate a page for a location only when there is distinct information to share, such as service coverage, local expertise, contact details or relevant case evidence.\n\nMeasure market-level performance\n\nTrack qualified leads and organic visibility by location or market. Use consistent analytics tagging and compare outcomes with business records.' }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/webzoneo');
  try {
    const serviceCount = await Service.countDocuments();
    const blogCount = await Blog.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(services);
      console.log('Seeded six starter services.');
    } else console.log('Services collection is not empty; skipped service seed.');
    if (blogCount === 0) {
      await Blog.insertMany(blogs);
      console.log('Seeded three starter articles.');
    } else console.log('Blogs collection is not empty; skipped blog seed.');
  } finally {
    await mongoose.disconnect();
  }
}
seed().catch((error) => { console.error('Content seed failed:', error.message); process.exitCode = 1; });
