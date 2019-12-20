import { Schema, model } from "mongoose";

const PostSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      sparse: true
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      sparse: true
    },
    id: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

export default model("Post", PostSchema);
