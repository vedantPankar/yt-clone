import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Watch from "./pages/Watch";

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:id" element={<Watch />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
