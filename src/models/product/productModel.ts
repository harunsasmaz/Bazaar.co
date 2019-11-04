import * as mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    imageType:{
        type: String,
        required: false
    },
    stock: {
        type: Boolean,
        required: true
    }

},{ versionKey: false});

export const ProductModel = mongoose.model('Product', productSchema);
