import { Schema, model, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    exercises: [{ type: String, required: true }],
    targetDurationMinutes: { type: Number, required: true, min: 10 },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced']
    }
  },
  { timestamps: true }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;
const Workout = model<WorkoutDocument>('Workout', workoutSchema);

export default Workout;