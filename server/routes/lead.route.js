import { Router } from 'express';
import auth, { adminOnly } from '../middleware/auth.js';
import { createLead, getAllLeads, searchLeads } from '../controllers/lead.controller.js';

const leadRouter = Router();
leadRouter.post('/create', createLead);
leadRouter.get('/', auth, adminOnly, getAllLeads);
leadRouter.get('/search', auth, adminOnly, searchLeads);

export default leadRouter;
