import { useEffect, useState } from "react";
import { fetchVideos } from "../services/api";
import VideoCard from "../components/VideoCard";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ MISSING STATE

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchVideos(); // ✅ NOW IMPORTED
        setVideos(data.videos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-400">Loading videos...</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}

export default Home;
