import mongoose from 'mongoose';

const categorySchema: any = new mongoose.Schema({
    foodName: { type: String, default: null },
    image: { type: String, default: null },
    isActive: { type: Boolean, default: true },
}, { timestamps: true })

export const foodcategoryModel = mongoose.model('category', categorySchema)
