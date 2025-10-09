import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useLayoutEffect } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const AlgorithmsPage = lazy(() => import("./pages/AlgorithmsPage"));
const About = lazy(() => import("./pages/About"));
const NavBar = lazy(() => import("./components/NavBar"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GameLayout = lazy(() => import("./pages/GameLayout"));
const WorkInProgressPage = lazy(() => import("./pages/WorkInProgressPage"));
const SpecificAlgoPage = lazy(() => import("./pages/SpecificAlgoPage"));

function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    const appElement = document.querySelector('.App');
    if (appElement) {
      appElement.scrollTop = 0;
    }
  }, [location.pathname]);
  
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
          <Route path="/moreOnAlgorithms/:algoname" element={<SpecificAlgoPage />} />

          {/* Paths for algorithms */}
          <Route path="/algo" element={<GameLayout algo="bubble_sort" />} />
          <Route path="/algo/:algoname" element={<GameLayout />} />

          <Route path="/algo/*" element={<WorkInProgressPage />} />
          <Route path="/moreOnAlgorithms/*" element={<WorkInProgressPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
