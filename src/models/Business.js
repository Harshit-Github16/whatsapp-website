import mongoose from 'mongoose';

const BusinessSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        businessName: {
            type: String,
            required: true,
            trim: true,
        },
        ownerName: {
            type: String,
            default: '',
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        about: {
            type: String,
            default: '',
        },
        services: {
            type: [String],
            default: [],
        },
        logoUrl: {
            type: String,
            default: '',
        },
        heroImageUrl: {
            type: String,
            default: '',
        },
        galleryUrls: {
            type: [String],
            default: [],
        },
        phone: {
            type: String,
            default: '',
        },
        email: {
            type: String,
            default: '',
        },
        address: {
            type: String,
            default: '',
        },
        theme: {
            type: String,
            enum: ['medical', 'gym', 'restaurant', 'salon', 'realestate'],
            default: 'medical',
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending',
        },
        paymentId: {
            type: String,
            default: '',
        },
        orderId: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model recompilation in development
export default mongoose.models.Business || mongoose.model('Business', BusinessSchema);
