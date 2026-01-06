import React from "react";

const VideoCard = () => {
  return (
    <div className="cursor-pointer">
      {/* Thumbnail */}
      <div className="w-full h-40 bg-gray-800 rounded-lg mb-2"></div>

      {/* Video Info */}
      <div>
        <h3 className="text-white text-sm font-semibold line-clamp-2"></h3>
        <p className="text-gray-400 text-xs mt-1">Channel Name</p>
        <p className="text-gray-500 text-xs">1M views • 1 day ago</p>
      </div>
    </div>
  );
};

export default VideoCard;
