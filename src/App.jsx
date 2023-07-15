import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AlgorithmsPage from "./pages/AlgorithmsPage";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import GameLayout from "./pages/GameLayout";
import WorkInProgressPage from "./pages/WorkInProgressPage";
import SpecificAlgoPage from "./pages/SpecificAlgoPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="about" element={<About />} />

        {/* Paths for moreOnAlgorithms */}
        <Route path="moreOnAlgorithms" element={<AlgorithmsPage />} />
        <Route
          path="moreOnAlgorithms/bubble_sort"
          element={<SpecificAlgoPage algo="bubble_sort" />}
        />
        <Route
          path="moreOnAlgorithms/selection_sort"
          element={<SpecificAlgoPage algo="selection_sort" />}
        />
        <Route
          path="moreOnAlgorithms/heap_sort"
          element={<SpecificAlgoPage algo="heap_sort" />}
        />

        {/* Paths for algorithms */}
        <Route path="algo" element={<GameLayout algo="bubble_sort" />} />
        <Route
          path="algo/bubble_sort"
          element={<GameLayout algo="bubble_sort" />}
        />
        <Route
          path="algo/selection_sort"
          element={<GameLayout algo="selection_sort" />}
        />
        <Route
          path="algo/heap_sort"
          element={<GameLayout algo="heap_sort" />}
        />
        <Route
          path="algo/merge_sort"
          element={<GameLayout algo="merge_sort" />}
        />

        <Route path="algo/*" element={<WorkInProgressPage />} />
        <Route path="moreOnAlgorithms/*" element={<WorkInProgressPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
