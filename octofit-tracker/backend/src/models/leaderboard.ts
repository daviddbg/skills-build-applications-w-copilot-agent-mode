import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    scope: { type: String, required: true, enum: ['user', 'team'] },
    referenceId: { type: Schema.Types.ObjectId, required: true },
    displayName: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    periodLabel: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;
const Leaderboard = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);

export default Leaderboard;