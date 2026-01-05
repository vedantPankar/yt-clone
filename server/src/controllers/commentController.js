import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import mongoose from "mongoose";

export const addComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const videoExists = await Video.findById(videoId);

    if (!videoExists) {
      return res.status(404).json({ message: "Video not found" });
    }

    const comment = await Comment.create({
      text,
      user: userId,
      video: videoId,
    });

    return res.status(201).json({
      message: "Comment added",
      comment,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET COMMENTS for VIDEO
export const getVideoComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const comments = await Comment.find({ video: videoId })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      comments,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
