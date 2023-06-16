import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AlgorithmsPage from "./pages/AlgorithmsPage";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import { BubbleSort } from "./pages/BubbleSort";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="moreOnAlgorithms" element={<AlgorithmsPage />} />
        <Route path="about" element={<About />} />
        <Route path="bubbleSort" element={<BubbleSort />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
