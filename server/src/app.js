import cors from "cors";
import morgan from "morgan";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import likeRoutes from "./controllers/likeController.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/likes", likeRoutes);

app.get("/", (req, res) => {
  res.send("Youtube Clone Api is running");
});

export default app;
