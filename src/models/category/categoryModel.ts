import * as mongoose from 'mongoose';


const CategorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{ versionKey: false});

export const CategoryModel = mongoose.model('Category', CategorySchema);
