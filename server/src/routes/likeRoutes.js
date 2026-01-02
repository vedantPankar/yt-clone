import express from "express";
import auth from "../middleware/auth.js";
import { getVideoLikes, toggleLike } from "../controllers/likeController.js";

const router = express.Router();

router.post("/:videoId", auth, toggleLike);
router.get("/:videoId", getVideoLikes);

export default router;
