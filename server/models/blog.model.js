import mongoose from "mongoose";
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    images: {
        type: [String],
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("blog", blogSchema);
export default BlogModel;
