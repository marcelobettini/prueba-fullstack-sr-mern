import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    permissions: {
        images: { type: Boolean, default: false },
        videos: { type: Boolean, default: false },
        texts: { type: Boolean, default: false }
    }
}, {
    timestamps: true
});
themeSchema.set("toJSON", {
    transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

// Unique index for theme name
themeSchema.index({ name: 1 }, { unique: true });

const Theme = mongoose.model('Theme', themeSchema);

export default Theme;
