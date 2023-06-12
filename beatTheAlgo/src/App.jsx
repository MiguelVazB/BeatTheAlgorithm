import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AlgorithmsPage from "./pages/AlgorithmsPage";
import About from "./pages/About";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="algorithms" element={<AlgorithmsPage />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
