import mongoose from 'mongoose';

const productSchema: any = new mongoose.Schema({
    productName: { type: String, default: null },
    description: { type: String, default: null },
    price: { type: Number, default: 0 },
    // foodSize: { type: Number, default: 0, enum: [0, 1, 2] },//----0-medium //----1-large //----2-extraLarge
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    isActive: { type: Boolean, default: true }
}, { timestamps: true })

export const foodproductModel = mongoose.model('product', productSchema);
