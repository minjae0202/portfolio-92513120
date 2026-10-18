import { Schema, model, models } from "mongoose";

const profileSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, default: "", trim: true },
    intro: { type: String, default: "", trim: true },
    bio: { type: String, default: "" },
    email: { type: String, default: "", trim: true },
    github: { type: String, default: "", trim: true },
    skills: {
      type: [{ category: String, items: [String] }],
      default: [],
    },
    timeline: {
      type: [{ period: String, title: String, detail: String }],
      default: [],
    },
  },
  { timestamps: true }
);

export const ProfileModel = models.Profile || model("Profile", profileSchema);
