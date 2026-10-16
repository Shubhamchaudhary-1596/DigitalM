import LeadModel from '../models/lead.model.js';

export const createLead = async (req, res) => {
    try {
        const { name, email, phone, interest, description } = req.body;

        if (!name || !email || !interest || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newLead = new LeadModel({
            name,
            email,
            phone,
            interest,
            description
        });

        await newLead.save();

        return res.status(201).json({ 
            message: "Lead created successfully",
            lead: newLead 
        });
    } catch (error) {
        console.error("Error creating lead:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

// Get all leads (admin)
export const getAllLeads = async (req, res) => {
    try {
        const leads = await LeadModel.find().sort({ createdAt: -1 }).lean();
        res.json({ success: true, leads, count: leads.length });
    } catch (error) {
        console.error("Error fetching leads:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Search leads by keyword in name/email/phone/interest/description
export const searchLeads = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: "Search query required" });
        }

        const keyword = new RegExp(q, 'i'); // case insensitive
        const leads = await LeadModel.find({
            $or: [
                { name: keyword },
                { email: keyword },
                { phone: keyword },
                { interest: keyword },
                { description: keyword }
            ]
        }).sort({ createdAt: -1 }).lean();

        res.json({ success: true, leads, count: leads.length });
    } catch (error) {
        console.error("Error searching leads:", error);
        res.status(500).json({ error: "Server error" });
    }
};
