import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Home />
        </main>
      </div>
    </div>
  );
}

export default App;
