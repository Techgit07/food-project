import mongoose from 'mongoose';

const cartSchema: any = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    quantity: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    isActive: { type: Boolean, default: true }
}, { timestamps: true })

export const addToCart = mongoose.model('addToCart', cartSchema)
