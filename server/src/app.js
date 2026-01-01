import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

app.get("/", (req, res) => {
  res.send("Youtube Clone Api is running");
});

export default app;
