import React from "react";
import "./pageStyles/SpecificAlgoPage.css";
import { Link, useParams } from "react-router-dom";
import AlgorithmDescriptions from "../AlgorithmDescriptions.json";
import StepByStepVisualizer from "../components/StepByStepVisualizer";

export default function SpecificAlgoPage() {
  const { algoname } = useParams();
  const [algorithm, setAlgorithm] = React.useState(null);
  const [algoName, setAlgoName] = React.useState("");
  const [steps, setSteps] = React.useState([]);
  const [sampleData, setSampleData] = React.useState([]);

  // Sample data for each algorithm
  const algorithmSamples = {
    bubble_sort: [64, 34, 25, 12, 22, 11, 90],
    selection_sort: [64, 25, 12, 22, 11, 34, 90],
    heap_sort: [12, 11, 13, 5, 6, 7, 15],
    merge_sort: [38, 27, 43, 3, 9, 82, 10]
  };

  React.useEffect(() => {
    if (algoname && AlgorithmDescriptions[algoname]) {
      setAlgorithm(AlgorithmDescriptions[algoname]?.detailedDescription);
      setAlgoName(
        algoname
          .split("_")
          .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
          .join(" ")
      );
      // Set sample data for the algorithm
      setSampleData([...algorithmSamples[algoname] || [1, 2, 3, 4, 5]]);
    }
  }, [algoname]);

  React.useEffect(() => {
    if (algorithm && algorithm.steps) {
      const algoSteps = Object.values(algorithm.steps);
      setSteps(algoSteps);
    }
  }, [algorithm]);

  const allAlgorithms = Object.keys(AlgorithmDescriptions);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="specific-algo-page">
      <div className="page-content">
        <aside className="left-sidebar">
          <h3 className="sidebar-title">Algorithms</h3>
          <nav className="sidebar-nav">
            {allAlgorithms.map((algorithm) => (
              <Link 
                key={algorithm} 
                to={`/moreOnAlgorithms/${algorithm}`} 
                className={`sidebar-link ${algorithm === algoname ? 'active' : ''}`}
              >
                {algorithm.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              </Link>
            ))}
          </nav>
        </aside>
        
        <main className="main-content">
          <div className="content-wrapper">
            <h1 className="page-title">{algoName}</h1>
            <p className="page-subtitle">A detailed look into the {algoName} algorithm.</p>
            
            <section id="introduction" className="content-section">
              <h2>Introduction</h2>
              <p>{algorithm?.simpleExplanation}</p>
            </section>
            
            <section id="steps" className="content-section">
              <h2>Steps</h2>
              <p>The core of {algoName} involves the following steps:</p>
              <ol className="steps-list">
                {steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </section>

            <section id="visual-example" className="content-section">
              <h2>Step-by-Step Visualization</h2>
              <StepByStepVisualizer
                algorithm={algoname}
                steps={steps}
                sampleData={sampleData}
              />
            </section>

            <section id="complexity" className="content-section">
              <h2>Complexity Analysis</h2>
              <div className="complexity-grid">
                <div className="complexity-card">
                  <h3>Time Complexity</h3>
                  <p>{algorithm?.timeComplexity}</p>
                </div>
                <div className="complexity-card">
                  <h3>Space Complexity</h3>
                  <p>{algorithm?.spaceComplexity}</p>
                </div>
              </div>
            </section>
            
            <section id="applications" className="content-section">
              <h2>Real-World Applications</h2>
              <p>{algorithm?.realWorldApplications}</p>
            </section>
            
            <div className="action-section">
              <Link className="play-button" to={`/algo/${algoname}`}>
                Play Challenge
              </Link>
            </div>
          </div>
        </main>
        
        <nav className="right-sidebar">
          <h3 className="sidebar-title">On this page</h3>
          <div className="toc-links">
            <a href="#introduction" onClick={(e) => { e.preventDefault(); scrollToSection('introduction'); }} className="toc-link">Introduction</a>
            <a href="#steps" onClick={(e) => { e.preventDefault(); scrollToSection('steps'); }} className="toc-link">Steps</a>
            <a href="#visual-example" onClick={(e) => { e.preventDefault(); scrollToSection('visual-example'); }} className="toc-link">Visual Example</a>
            <a href="#complexity" onClick={(e) => { e.preventDefault(); scrollToSection('complexity'); }} className="toc-link">Complexity</a>
            <a href="#applications" onClick={(e) => { e.preventDefault(); scrollToSection('applications'); }} className="toc-link">Applications</a>
          </div>
        </nav>
      </div>
    </div>
  );
}
