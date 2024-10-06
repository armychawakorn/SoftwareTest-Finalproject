import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        email: String,
        password: String
    },
    {
        timestamps: true
    }
);

export const user = mongoose.models.user || model('user', userSchema);