import cloudinary from "../config/cloudinary.js";
import Video from "../models/Video.js";

export const uploadVideo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Video file is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "youtube-clone/videos",
      eager: [
        {
          streaming_profile: "hd",
          format: "m3u8",
        },
      ],
      eager_async: true,
    });

    const thumbnailUrl = cloudinary.url(result.public_id, {
      resource_type: "video",
      format: "jpg",
      transformation: [{ width: 480, height: 270, crop: "fill" }],
    });

    const video = await Video.create({
      title,
      description,
      videoUrl: result.eager[0].secure_url,
      thumbnail: thumbnailUrl, // ✅ NEW
      owner: req.user.id,
    });

    return res.status(201).json({
      message: "Video uploaded successfully",
      video,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("owner", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      videos,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(400).json({
        message: "  Video not found",
      });
    }

    return res.status(200).json({
      video,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
