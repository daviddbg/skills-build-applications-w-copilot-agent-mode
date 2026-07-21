import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    weeklyPoints: { type: Number, default: 0 }
}, { timestamps: true });
const Team = model('Team', teamSchema);
export default Team;
