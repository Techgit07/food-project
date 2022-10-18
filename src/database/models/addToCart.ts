import mongoose from 'mongoose';

const cartSchema: any = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    quantity: { type: Number, default: 0 },
    foodSize: { type: Number, default: 0, enum: [0, 1, 2] },//----0-medium //----1-large //----2-extraLarge
    total: { type: Number, default: 0 },
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    // categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    isActive: { type: Boolean, default: true }
}, { timestamps: true })

export const addToCart = mongoose.model('addToCart', cartSchema)
    