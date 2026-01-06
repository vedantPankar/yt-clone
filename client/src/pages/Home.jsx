import VideoCard from "../components/VideoCard";

function Home() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <VideoCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default Home;
