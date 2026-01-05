import express from "express";
import auth from "../middleware/auth.js";
import {
  toggleSubscription,
  getSubscriberCount,
} from "../controllers/subscriptionController.js";

const router = express.Router();

router.post("/:channelId", auth, toggleSubscription);
router.get("/:channelId", getSubscriberCount);

export default router;
