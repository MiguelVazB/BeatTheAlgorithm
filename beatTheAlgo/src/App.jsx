import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AlgorithmsPage from "./pages/AlgorithmsPage";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import GameLayout from "./pages/GameLayout";
import WorkInProgressPage from "./pages/WorkInProgressPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="moreOnAlgorithms" element={<AlgorithmsPage />} />
        <Route path="about" element={<About />} />
        <Route path="algo" element={<GameLayout algo="bubble_sort" />} />
        <Route
          path="algo/bubble_sort"
          element={<GameLayout algo="bubble_sort" />}
        />
        <Route path="algo/*" element={<WorkInProgressPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
