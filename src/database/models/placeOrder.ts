import mongoose from "mongoose";

const placeorderSchema: any = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    companyName: { type: String, default: null },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    notes: { type: String, required: true },
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    deviceToken: { type: [{ type: String }], default: [] },
    isActive: { type: Boolean, default: true }
}, { timestamps: true })

export const placeorderModel = mongoose.model('placeOrder', placeorderSchema);    