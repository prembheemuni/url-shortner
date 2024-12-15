import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
      unique: true
    },
    author : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true},
    visitHistory: [{ timeStamp: { type: Number } }],
  },
  { timestamps: true }
);

const URL = new mongoose.model("url", urlSchema);
export default URL;
