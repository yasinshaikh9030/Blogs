import mongoose from "mongoose";
const likeschema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // by this we can keep track of which post is liked
  },
  user: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Like", likeschema);
