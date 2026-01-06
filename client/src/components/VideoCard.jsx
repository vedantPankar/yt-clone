import { useNavigate } from "react-router-dom";

function VideoCard() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/watch/123")} className="cursor-pointer">
      <div className="w-full h-40 bg-gray-800 rounded-lg mb-2"></div>

      <h3 className="text-white text-sm font-semibold line-clamp-2">
        Sample Video Title Goes Here
      </h3>

      <p className="text-gray-400 text-xs mt-1">Channel Name</p>

      <p className="text-gray-500 text-xs">1M views • 1 day ago</p>
    </div>
  );
}

export default VideoCard;
