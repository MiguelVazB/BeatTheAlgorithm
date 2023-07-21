import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const AlgorithmsPage = lazy(() => import("./pages/AlgorithmsPage"));
const About = lazy(() => import("./pages/About"));
const NavBar = lazy(() => import("./components/NavBar"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GameLayout = lazy(() => import("./pages/GameLayout"));
const WorkInProgressPage = lazy(() => import("./pages/WorkInProgressPage"));
const SpecificAlgoPage = lazy(() => import("./pages/SpecificAlgoPage"));

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="loading-container">
            <div className="loading-icon"></div>
          </div>
        }
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/about" element={<About />} />

          {/* Paths for moreOnAlgorithms */}
          <Route path="/moreOnAlgorithms" element={<AlgorithmsPage />} />
          <Route
            path="/moreOnAlgorithms/bubble_sort"
            element={<SpecificAlgoPage algo="bubble_sort" />}
          />
          <Route
            path="/moreOnAlgorithms/selection_sort"
            element={<SpecificAlgoPage algo="selection_sort" />}
          />
          <Route
            path="/moreOnAlgorithms/heap_sort"
            element={<SpecificAlgoPage algo="heap_sort" />}
          />
          <Route
            path="/moreOnAlgorithms/merge_sort"
            element={<SpecificAlgoPage algo="merge_sort" />}
          />
          <Route
            path="/moreOnAlgorithms/quick_sort"
            element={<SpecificAlgoPage algo="quick_sort" />}
          />

          {/* Paths for algorithms */}
          <Route path="/algo" element={<GameLayout algo="bubble_sort" />} />
          <Route
            path="/algo/bubble_sort"
            element={<GameLayout algo="bubble_sort" />}
          />
          <Route
            path="/algo/selection_sort"
            element={<GameLayout algo="selection_sort" />}
          />
          <Route
            path="/algo/heap_sort"
            element={<GameLayout algo="heap_sort" />}
          />
          <Route
            path="/algo/merge_sort"
            element={<GameLayout algo="merge_sort" />}
          />
          <Route
            path="/algo/quick_sort"
            element={<GameLayout algo="quick_sort" />}
          />

          <Route path="/algo/*" element={<WorkInProgressPage />} />
          <Route path="/moreOnAlgorithms/*" element={<WorkInProgressPage />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
