import { Router } from 'express';
import { createLead, getAllLeads, searchLeads } from '../controllers/lead.controller.js';
import auth from '../middleware/auth.js';

const leadRouter = Router();

leadRouter.post('/create', createLead);
leadRouter.get('/', auth, getAllLeads);
leadRouter.get('/search', auth, searchLeads);

export default leadRouter;
