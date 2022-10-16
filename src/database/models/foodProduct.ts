import mongoose from 'mongoose';

const productSchema: any = new mongoose.Schema({
    productName: { type: String, default: null },
    description: { type: String, default: null },
    price: { type: Number, default: 0 },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    isActive: { type: Boolean, default: true }
}, { timestamps: true })

export const foodproductModel = mongoose.model('product', productSchema);
