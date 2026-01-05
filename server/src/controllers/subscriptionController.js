import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// SUBSCRIBE / UNSUBSCRIBE
export const toggleSubscription = async (req, res) => {
  try {
    const { channelId } = req.params;
    const subscriberId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      return res.status(400).json({ message: "Invalid channel ID" });
    }

    if (channelId === subscriberId) {
      return res.status(400).json({ message: "Cannot subscribe to yourself" });
    }

    const channelExists = await User.findById(channelId);
    if (!channelExists) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const existingSub = await Subscription.findOne({
      subscriber: subscriberId,
      channel: channelId,
    });

    // UNSUBSCRIBE
    if (existingSub) {
      await Subscription.deleteOne({ _id: existingSub._id });
      return res.status(200).json({ message: "Unsubscribed" });
    }

    // SUBSCRIBE
    await Subscription.create({
      subscriber: subscriberId,
      channel: channelId,
    });

    return res.status(201).json({ message: "Subscribed" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    return res.status(500).json({ message: error.message });
  }
};

// GET SUBSCRIBER COUNT
export const getSubscriberCount = async (req, res) => {
  try {
    const { channelId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      return res.status(400).json({ message: "Invalid channel ID" });
    }

    const count = await Subscription.countDocuments({
      channel: channelId,
    });

    return res.status(200).json({
      subscribers: count,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
