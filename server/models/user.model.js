import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"]
    },
    email: {
        type: String,
        required: false,
        unique:true
    },
    password: {
        type: String,
        required: [true, "Provide password"]
    },
    avatar: {
        type: String,
        default: ""
    },
    
    mobile: {
        type: Number,
        default: null
    },
    access_token: {
        type: String,
        default: ""
    },
    refresh_token: {
        type: String,
        default: ""
    },
    last_login_date: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ["Active", "Inactive","Suspended"],
        default: "Active"
    },
    
    orderHistory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "order"
        }
    ],
   
    otp: { type: String, default: null, select: false },
    otpExpires: { type: Date, default: null, select: false },
    passwordResetVerifiedAt: { type: Date, default: null, select: false },
    role: {
        type: String,
        enum: ["Admin", "USER"],
        default: "USER"
    },
    adminAccess: {
        type: Boolean,
        default: false
    },
    pendingAdmin: {
        type: Boolean,
        default: false
    },
    signUpWithGoogle: {
        type: Boolean,
        default: false
    },

},
   {timestamps: true}
)
const UserModel = mongoose.model("User", userSchema);
export default UserModel;