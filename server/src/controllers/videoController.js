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

    const video = await Video.create({
      title,
      description,
      videoUrl: result.eager[0].secure_url,
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
