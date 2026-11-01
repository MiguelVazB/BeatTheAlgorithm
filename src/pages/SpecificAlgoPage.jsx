import "./pageStyles/SpecificAlgoPage.css";
import { Link, useParams } from "react-router-dom";
import AlgorithmDescriptions from "../AlgorithmDescriptions.json";
import StepByStepVisualizer from "../components/StepByStepVisualizer";
import Icon from "../components/Icon";

const algorithmSamples = {
  bubble_sort: [64, 34, 25, 12, 22, 11, 90],
  selection_sort: [64, 25, 12, 22, 11, 34, 90],
  heap_sort: [12, 11, 13, 5, 6, 7, 15],
  merge_sort: [38, 27, 43, 3, 9, 82, 10],
};
const algorithmFacts = {
  bubble_sort: { time: "O(n²)", space: "O(1)", approach: "Compare & swap", summary: "Small comparisons. A clearer picture. See how neighboring numbers find their place, one swap at a time." },
  selection_sort: { time: "O(n²)", space: "O(1)", approach: "Find the minimum", summary: "Find the smallest. Make your move. Build a sorted list by choosing the next number with care." },
  heap_sort: { time: "O(n log n)", space: "O(1)", approach: "Build a heap", summary: "A little structure goes a long way. Explore how a binary heap turns an unsorted list into an ordered one." },
  merge_sort: { time: "O(n log n)", space: "O(n)", approach: "Divide & conquer", summary: "Break it down. Bring it together. Discover how smaller, simpler lists become one sorted whole." },
};
const sections = [
  ["introduction", "The idea"],
  ["visual-example", "See it in action"],
  ["steps", "How it works"],
  ["complexity", "Time & space"],
  ["applications", "In the real world"],
];
const formatName = (name) => name.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

export default function SpecificAlgoPage() {
  const { algoname } = useParams();
  const algorithm = AlgorithmDescriptions[algoname]?.detailedDescription;
  const facts = algorithmFacts[algoname];

  if (!algorithm || !facts) {
    return <main className="lesson-not-found"><p className="lesson-eyebrow">Keep exploring</p><h1>Let’s find your next algorithm.</h1><Link to="/moreOnAlgorithms">Browse all algorithms <Icon name="arrow-right" size={18} /></Link></main>;
  }

  const algoName = formatName(algoname);
  const steps = Object.values(algorithm.steps);

  return (
    <div className="lesson-page">
      <div className="lesson-layout">
        <aside className="lesson-sidebar">
          <Link className="lesson-back-link" to="/moreOnAlgorithms"><Icon name="arrow-left" size={15} /> All algorithms</Link>
          <p className="lesson-nav-label">The sorting collection</p>
          <nav className="lesson-algorithm-nav" aria-label="Algorithms">
            {Object.keys(AlgorithmDescriptions).map((name, index) => (
              <Link key={name} to={`/moreOnAlgorithms/${name}`} aria-current={name === algoname ? "page" : undefined} className={`lesson-algorithm-link ${name === algoname ? "is-active" : ""}`}>
                <span className="lesson-nav-number">0{index + 1}</span><span>{formatName(name)}</span>{name === algoname && <Icon name="arrow-right" size={14} />}
              </Link>
            ))}
          </nav>
          <div className="lesson-toc">
            <p className="lesson-nav-label">On this page</p>
            <nav aria-label="On this page">{sections.map(([id, title]) => <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); document.getElementById(id)?.scrollIntoView(); }}>{title}</a>)}</nav>
          </div>
          <div className="lesson-sidebar-note"><Icon name="play" size={18} /><p>Ready to put it into practice?</p><Link to={`/algo/${algoname}`}>Take the challenge <Icon name="arrow-up-right" size={13} /></Link></div>
        </aside>

        <main className="lesson-main">
          <header className="lesson-header">
            <p className="lesson-eyebrow"><span /> Learn the algorithm</p>
            <h1>{algoName}<span>.</span></h1>
            <p className="lesson-summary">{facts.summary}</p>
            <div className="lesson-quick-facts"><span>{facts.approach}</span><span>Time <strong>{facts.time}</strong></span><span>Space <strong>{facts.space}</strong></span></div>
          </header>

          <section id="introduction" className="lesson-section">
            <div className="lesson-section-heading"><span>01</span><h2>The idea</h2></div>
            <p>{algorithm.simpleExplanation}</p>
          </section>

          <section id="visual-example" className="lesson-section lesson-visual-section">
            <div className="lesson-section-heading"><span>02</span><h2>See it in action</h2></div>
            <p>Move through each step at your own pace, or press play to follow along.</p>
            <StepByStepVisualizer key={algoname} algorithm={algoname} sampleData={algorithmSamples[algoname]} />
          </section>

          <section id="steps" className="lesson-section">
            <div className="lesson-section-heading"><span>03</span><h2>How it works</h2></div>
            <ol className="lesson-steps">{steps.map((step, index) => <li key={index}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
          </section>

          <section id="complexity" className="lesson-section">
            <div className="lesson-section-heading"><span>04</span><h2>Time & space</h2></div>
            <div className="lesson-complexity-grid">
              <div className="lesson-complexity-card"><span className="lesson-fact-label">Time complexity</span><strong>{facts.time}</strong><p>{algorithm.timeComplexity}</p></div>
              <div className="lesson-complexity-card"><span className="lesson-fact-label">Space complexity</span><strong>{facts.space}</strong><p>{algorithm.spaceComplexity}</p></div>
            </div>
          </section>

          <section id="applications" className="lesson-section">
            <div className="lesson-section-heading"><span>05</span><h2>In the real world</h2></div>
            <p>{algorithm.realWorldApplications}</p>
          </section>
          <div className="lesson-challenge-cta"><div><span>Your turn</span><h2>Know the moves. Beat the algorithm.</h2><p>Put what you’ve learned to the test.</p></div><Link to={`/algo/${algoname}`}>Play {algoName} <Icon name="arrow-right" size={17} /></Link></div>
        </main>
      </div>
    </div>
  );
}
