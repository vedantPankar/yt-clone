import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Watch from "./pages/Watch";

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Watch />
        </main>
      </div>
    </div>
  );
}

export default App;
