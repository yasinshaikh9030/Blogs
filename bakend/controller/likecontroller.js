import Post from "../models/postmodel.js";
import Like from "../models/likemodel.js";

export const likepost = async (req, res) => {
  try {
    const { post: postid, user } = req.body;
    if (!postid || !user) {
      return res.status(400).json({ message: "post and user are required" });
    }
    const like = new Like({ post: postid, user });
    const savedlike = await like.save();
    await Post.findByIdAndUpdate(
      postid,
      { $push: { likes: savedlike._id } },
      { new: true }
    );
    const populatedPost = await Post.findById(postid).populate("likes");
    res.json({
      message: "Post liked successfully",
      likedata: savedlike,
      postdata: populatedPost,
    });
  } catch (err) {
    console.error(err);
    console.log("Error in likepost controller");
    res.status(400).json({
      message: "Internal Server Error!!",
      error: err.message,
      stack: err.stack,
    });
  }
};

export const unlikepost = async (req, res) => {
  try {
    const { post: postid, like: likeid } = req.body;
    // find and delete
    const deletedLike = await Like.findOneAndDelete({
      post: postid,
      _id: likeid,
    });
    // if (!deletedLike) {
    //   return res.status(404).json({ message: "Like not found" });
    // }
    // update the post
    const updatedPost = await Post.findByIdAndUpdate(
      postid,
      { $pull: { likes: deletedLike._id } },
      { new: true }
    );
    res.json({
      message: "Post unliked successfully",
      postdata: updatedPost,
      likedeleted: deletedLike,
    });
  } catch (err) {
    console.error(err);
    console.log("Error in unlikepost controller");
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      stack: err.stack,
    });
  }
};
