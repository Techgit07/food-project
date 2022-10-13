import mongoose from "mongoose";

const userSchema: any = new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    userType: { type: Number, default: 0, enum: [0, 1] },//----0-user // --- 1-admin
    isActive: { type: Boolean, default: true }
}, { timestamps: true })

export const userModel = mongoose.model('user', userSchema);