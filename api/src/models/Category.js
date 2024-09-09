import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: ['image', 'video', 'document'], required: true },
    coverImage: { type: String, required: true }
}, {
    timestamps: true
});
categorySchema.set("toJSON", {
    transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;

