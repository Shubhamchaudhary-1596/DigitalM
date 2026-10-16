import mongoose from "mongoose";

const leadSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    phone: {
        type: String,
        required: false
    },
    interest: {
        type: String,
        required: [true, "Interest type is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    status: {
        type: String,
        enum: ["new", "contacted", "qualified", "converted", "lost"],
        default: "new"
    }
}, { timestamps: true });

const LeadModel = mongoose.model("Lead", leadSchema);
export default LeadModel;
