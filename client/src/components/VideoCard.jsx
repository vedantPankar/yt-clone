import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/watch/${video._id}`)}
      className="cursor-pointer"
    >
      {/* Thumbnail */}
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-40 object-cover rounded-lg mb-2"
      />

      {/* Video Info */}
      <div>
        <h3 className="text-white text-sm font-semibold line-clamp-2">
          {video.title}
        </h3>

        <p className="text-gray-400 text-xs mt-1">{video.owner?.username}</p>

        <p className="text-gray-500 text-xs">
          {/* Placeholder for now */}
          Uploaded video
        </p>
      </div>
    </div>
  );
}

export default VideoCard;
