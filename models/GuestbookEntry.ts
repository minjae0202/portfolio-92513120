import { Schema, model, models } from "mongoose";

const guestbookEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    authorName: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true, maxlength: 500 },
  },
  { timestamps: true }
);

export const GuestbookEntryModel =
  models.GuestbookEntry || model("GuestbookEntry", guestbookEntrySchema);
