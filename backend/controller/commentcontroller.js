import comment from "../models/commentmodel.js";
import Post from "../models/postmodel.js";

export const createcomment = async (req, res) => {
  try {
    const { post, user, body } = req.body;
    const newComment = new comment({
      post,
      user,
      body,
    });
    const savedComment = await newComment.save();
    const updatepost = await Post.findByIdAndUpdate(
      post,
      {
        $push: { comments: savedComment._id },
      },
      { new: true }
    )
      .populate("comments")
      .exec();
    res.json({
      post: updatepost,
    });
  } catch (err) {
    console.error("Error in createcomment:", err);
    return res.status(500).json({
      message: "Error creating comment",
    });
  }
};

export const getallcomments = async (req, res) => {
  try {
    const comments = await comment.find().exec();
    res.json({
      message: "All comments fetched successfully",
      commentdata: comments,
    });
  } catch (err) {
    console.error(err);
    console.log("Error in getallcomments controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};
