import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Hls from "hls.js";
import { fetchVideoById, getVideoLikes, toggleLike } from "../services/api";

function Watch() {
  const { id } = useParams();
  const videoRef = useRef(null);

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  // 1) Fetch video by id
  useEffect(() => {
    const loadVideo = async () => {
      try {
        const data = await fetchVideoById(id);
        setVideo(data.video);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [id]);

  // 2) Setup HLS playback
  useEffect(() => {
    if (!video || !video.videoUrl) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(video.videoUrl);
      hls.attachMedia(videoRef.current);

      return () => hls.destroy();
    }

    // Safari (native HLS)
    if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = video.videoUrl;
    }
  }, [video]);

  // 3) Load like count
  useEffect(() => {
    if (!video) return;

    const loadLikes = async () => {
      try {
        const data = await getVideoLikes(video._id);
        setLikes(data.likes);
      } catch (err) {
        console.error(err);
      }
    };

    loadLikes();
  }, [video]);

  // 4) Like handler
  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login to like videos");
        return;
      }

      await toggleLike(video._id, token);

      // Optimistic update
      setLiked((prev) => !prev);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-4 text-gray-400">Loading video...</div>;
  }

  if (!video) {
    return <div className="p-4 text-red-500">Video not found</div>;
  }

  return (
    <div className="p-4 text-white">
      {/* VIDEO PLAYER */}
      <video
        ref={videoRef}
        controls
        className="w-full max-h-[500px] rounded-lg bg-black"
      />

      {/* TITLE */}
      <h1 className="text-xl font-semibold mt-3">{video.title}</h1>

      {/* CHANNEL + LIKE */}
      <div className="flex items-center justify-between mt-2">
        <p className="text-gray-400">{video.owner?.username}</p>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className={`px-4 py-1 rounded ${
              liked ? "bg-blue-600" : "bg-gray-800"
            } hover:bg-blue-500`}
          >
            👍 Like
          </button>

          <span className="text-gray-400 text-sm">{likes} likes</span>
        </div>
      </div>
    </div>
  );
}

export default Watch;
