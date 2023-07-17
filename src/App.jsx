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
        <Route path="/BeatTheAlgorithm/" element={<HomePage />} />

        <Route path="/BeatTheAlgorithm/about" element={<About />} />

        {/* Paths for moreOnAlgorithms */}
        <Route
          path="/BeatTheAlgorithm/moreOnAlgorithms"
          element={<AlgorithmsPage />}
        />
        <Route
          path="/BeatTheAlgorithm/moreOnAlgorithms/bubble_sort"
          element={<SpecificAlgoPage algo="bubble_sort" />}
        />
        <Route
          path="/BeatTheAlgorithm/moreOnAlgorithms/selection_sort"
          element={<SpecificAlgoPage algo="selection_sort" />}
        />
        <Route
          path="/BeatTheAlgorithm/moreOnAlgorithms/heap_sort"
          element={<SpecificAlgoPage algo="heap_sort" />}
        />
        <Route
          path="/BeatTheAlgorithm/moreOnAlgorithms/merge_sort"
          element={<SpecificAlgoPage algo="merge_sort" />}
        />

        {/* Paths for algorithms */}
        <Route
          path="/BeatTheAlgorithm/algo"
          element={<GameLayout algo="bubble_sort" />}
        />
        <Route
          path="/BeatTheAlgorithm/algo/bubble_sort"
          element={<GameLayout algo="bubble_sort" />}
        />
        <Route
          path="/BeatTheAlgorithm/algo/selection_sort"
          element={<GameLayout algo="selection_sort" />}
        />
        <Route
          path="/BeatTheAlgorithm/algo/heap_sort"
          element={<GameLayout algo="heap_sort" />}
        />
        <Route
          path="/BeatTheAlgorithm/algo/merge_sort"
          element={<GameLayout algo="merge_sort" />}
        />

        <Route
          path="/BeatTheAlgorithm/algo/*"
          element={<WorkInProgressPage />}
        />
        <Route
          path="/BeatTheAlgorithm/moreOnAlgorithms/*"
          element={<WorkInProgressPage />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
