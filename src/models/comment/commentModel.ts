import * as mongoose from 'mongoose';


const CommentSchema = new mongoose.Schema({
    commentId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        validate: {
            validator: Number.isInteger,
            message: 'Type error'
        }
    }
},{ versionKey: false});

export const CommentModel = mongoose.model('Comment', CommentSchema);
