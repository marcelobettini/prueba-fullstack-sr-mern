import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['image', 'video', 'text'], required: true },
    url: { type: String, required: true },
    theme: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    credits: { type: String, required: true },
}, {
    timestamps: true
});

const Content = mongoose.model('Content', contentSchema);

export default Content;
