import mongoose from "mongoose";

const golferSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    handicap: {
      type: Number,
      min: [-10, "Handicap cannot be lower than -10"],
      max: [54, "Handicap cannot be higher than 54"],
      default: null,
    },

    dominantHand: {
      type: String,
      enum: ["right", "left"],
      default: "right",
    },

    goals: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Golfer = mongoose.model("Golfer", golferSchema);

export default Golfer;