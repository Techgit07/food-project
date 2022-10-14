import mongoose from 'mongoose';

const categorySchema: any = new mongoose.Schema({
    foodName: { type: String, default: null },
    image: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null }
}, { timestamps: true })

export const foodcategoryModel = mongoose.model('category', categorySchema)
