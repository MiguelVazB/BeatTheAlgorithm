import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useLayoutEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const HomePage = lazy(() => import("./pages/HomePage"));
const AlgorithmsPage = lazy(() => import("./pages/AlgorithmsPage"));
const About = lazy(() => import("./pages/About"));
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
      <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); document.getElementById('main-content')?.focus(); document.getElementById('main-content')?.scrollIntoView(); }}>Skip to content</a>
      <NavBar />
      <div className="page-outlet" id="main-content" tabIndex={-1}>
      <Suspense
        fallback={
          <div className="loading-container" role="status" aria-label="Loading page">
            <div className="loading-icon" aria-hidden="true"></div>
          </div>
        }
      >
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
      <Footer />
    </div>
  );
}

export default App;
