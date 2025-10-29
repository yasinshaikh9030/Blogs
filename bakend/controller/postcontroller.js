import postmodel from "../models/postmodel.js";
//const postmodel = require("../models/postmodel.js");

export const createpost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new postmodel({
      title,
      body,
    });
    const savedpost = await post.save();

    res.json({
      message: "Post created successfully",
      postdata: savedpost, // wtrite any thing
    });
  } catch (err) {
    console.error(err);
    console.log("Error in createpost controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getallposts = async (req, res) => {
  try {
    const posts = await postmodel.find().populate("comments", "likes").exec();
    res.json({
      message: "All posts fetched successfully",
      postdata: posts,
    });
  } catch (err) {
    console.error(err);
    console.log("Error in getallposts controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};
