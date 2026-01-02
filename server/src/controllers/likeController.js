import Like from "../models/Like.js";
import Video from "../models/Video.js";
import mongoose from "mongoose";

export const toggleLike = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const videoExists = await Video.findById(videoId);
    if (!videoExists) {
      return res.status(404).json({ message: "Video not found" });
    }

    const existingLike = await Like.findOne({
      user: userId,
      video: videoId,
    });

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      return res.status(200).json({ message: "Video unliked" });
    }

    await Like.create({
      user: userId,
      video: videoId,
    });

    return res.status(201).json({ message: "Video liked" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getVideoLikes = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const count = await Like.countDocuments({ video: videoId });

    return res.status(200).json({
      likes: count,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
