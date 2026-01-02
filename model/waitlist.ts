// import mongoose, { Schema, Document, Model } from "mongoose";


// export interface IWaitlist extends Document {
//   firstName: string;
//   lastName: string;
//   emailAddress: string;
//   userType: "rider" | "driver" | "partner";
//   createdAt: Date;
//   updatedAt: Date;
// }

// const WaitlistSchema: Schema<IWaitlist> = new Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 2,
//     },

//     lastName: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 2,
//     },

//     emailAddress: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       index: true,
//     },

//     userType: {
//       type: String,
//       required: true,
//       enum: ["rider", "driver", "partner"],
//     },
//   },
//   {
//     timestamps: true, // adds createdAt & updatedAt
//   }
// );

// // Prevent model overwrite error in Next.js
// const Waitlist: Model<IWaitlist> =
//   mongoose.models.Waitlist ||
//   mongoose.model<IWaitlist>("Waitlist", WaitlistSchema);

// export default Waitlist;


// import mongoose, { Schema, Document, Model } from "mongoose";

// export interface IWaitlist extends Document {
//   firstName: string;
//   lastName: string;
//   emailAddress: string;
//   userType: "rider" | "driver" | "partner";
//   agreePrivacy: boolean;
//   agreeTerms: boolean;
//   consentSMS: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const WaitlistSchema: Schema<IWaitlist> = new Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 2,
//     },

//     lastName: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 2,
//     },

//     emailAddress: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       index: true,
//     },

//     userType: {
//       type: String,
//       required: true,
//       enum: ["rider", "driver", "partner"],
//     },

//     agreePrivacy: {
//       type: Boolean,
//       required: true,
//     },

//     agreeTerms: {
//       type: Boolean,
//       required: true,
//     },

//     consentSMS: {
//       type: Boolean,
//       required: true,
//     },
//   },
//   {
//     timestamps: true, // adds createdAt & updatedAt
//   }
// );

// // Prevent model overwrite error in Next.js
// const Waitlist: Model<IWaitlist> =
//   mongoose.models.Waitlist ||
//   mongoose.model<IWaitlist>("Waitlist", WaitlistSchema);

// export default Waitlist;


// /model/waitlist.ts
import mongoose from "mongoose";

const WaitlistSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    emailAddress: { type: String, required: true, unique: true },
    userType: { type: String, required: true },

    // REQUIRED CONSENTS
    agreePrivacy: { type: Boolean, required: true },
    agreeTerms: { type: Boolean, required: true },
    consentSMS: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Waitlist ||
  mongoose.model("Waitlist", WaitlistSchema);
