import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    fitnessLevel: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced']
    },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    totalPoints: { type: Number, default: 0 }
}, { timestamps: true });
const User = model('User', userSchema);
export default User;
