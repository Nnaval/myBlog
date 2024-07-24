import { mongoose, Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "username must be unique "],
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: [true, "input email"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);