function Watch() {
  return (
    <div className="p-4 text-white">
      {/* Video Player */}
      <div className="w-full h-[450px] bg-black rounded-lg mb-4">
        <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
          Video Player
        </div>
      </div>

      {/* Video Title */}
      <h1 className="text-xl font-semibold mb-2">
        Sample Video Title Goes Here
      </h1>

      {/* Actions */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400">Channel Name</p>

        <div className="flex gap-2">
          <button className="px-4 py-1 bg-gray-800 rounded hover:bg-gray-700">
            👍 Like
          </button>
          <button className="px-4 py-1 bg-red-600 rounded hover:bg-red-500">
            Subscribe
          </button>
        </div>
      </div>

      {/* Comments */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Comments</h2>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-900 p-3 rounded">
              <p className="text-sm text-gray-300">Username</p>
              <p className="text-sm mt-1">This is a sample comment.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Watch;
