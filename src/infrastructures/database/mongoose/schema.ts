import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  from: { type: String, required: true },
  comment: { type: String, required: true },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const AnimationSchema = new Schema({
  name: { type: String, required: true },
  tags: [String],
  likes: Number,
  comments: [CommentSchema],
  url: { type: Object, required: true },
  isSynced: { type: Boolean, default: true },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const AnimationModel = mongoose.model("Animation", AnimationSchema);

export default AnimationModel;
