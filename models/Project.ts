import { Schema, model, models } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    summary: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, default: "" },
    period: { type: String, default: "", trim: true },
    techStack: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    repoUrl: { type: String, default: "", trim: true },
    deployUrl: { type: String, default: "", trim: true },
    category: { type: String, enum: ["course", "whitehat", "personal"], default: "personal" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ProjectModel = models.Project || model("Project", projectSchema);
