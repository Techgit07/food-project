import mongoose from "mongoose";

const placeorderSchema: any = new mongoose.Schema({
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    companyName: { type: String, default: null },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    address: { type: String, default: null },
    postalCode: { type: String, default: null },
    city: { type: String, default: null },
    notes: { type: String, default: null },
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    isActive: { type: Boolean, default: true }
}, { timestamps: true })

export const placeorderModel = mongoose.model('placeOrder', placeorderSchema);    