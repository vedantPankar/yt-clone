import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import { uploadVideo, getAllVideos } from "../controllers/videoController.js";

const router = express.Router();

router.post("/upload", auth, upload.single("video"), uploadVideo);
router.get("/", getAllVideos);

export default router;
