import { Link } from "react-router-dom";
import AlgorithmArt from "../components/AlgorithmArt";
import Icon from "../components/Icon";
import "./pageStyles/AlgorithmsPage.css";

const algorithms = [
  {
    id: "bubble_sort",
    name: "Bubble Sort",
    number: "01",
    level: "Beginner friendly",
    complexity: "O(n²)",
    method: "Compare & swap",
    description: "Small swaps. Big progress. Compare neighboring values and watch the largest ones rise to the end.",
  },
  {
    id: "selection_sort",
    name: "Selection Sort",
    number: "02",
    level: "Beginner friendly",
    complexity: "O(n²)",
    method: "Find the minimum",
    description: "Find the smallest value, give it a home, and repeat. Build a sorted list one good choice at a time.",
  },
  {
    id: "heap_sort",
    name: "Heap Sort",
    number: "03",
    level: "A step further",
    complexity: "O(n log n)",
    method: "Build & extract",
    description: "Turn a list into a tree. Use the structure of a heap to bring a little order to the chaos.",
  },
  {
    id: "merge_sort",
    name: "Merge Sort",
    number: "04",
    level: "A step further",
    complexity: "O(n log n)",
    method: "Divide & conquer",
    description: "Break the problem into smaller pieces, then bring them back together in the right order.",
  },
  {
    id: "quick_sort",
    name: "Quick Sort",
    number: "05",
    level: "A step further",
    complexity: "O(n log n)",
    method: "Partition around a pivot",
    description: "Pick a pivot and give each value a side. Sort the smaller partitions until everything finds its place.",
  },
];

export default function AlgorithmsPage() {
  return (
    <main className="algorithm-library">
      <header className="library-intro">
        <div>
          <p className="library-eyebrow"><span /> The algorithm library</p>
          <h1>A little logic.<br />A worthy opponent.</h1>
        </div>
        <p className="library-intro-description">
          Get to know the algorithms, then go head to head.
          Pick a challenge and turn understanding into instinct.
        </p>
      </header>

      <section aria-labelledby="library-sorting-title">
        <div className="library-section-heading">
          <div className="library-section-label">
            <h2 id="library-sorting-title">Sorting algorithms</h2>
            <span className="library-count">{String(algorithms.length).padStart(2, "0")}</span>
          </div>
          <p>Different approaches. One sorted list.</p>
        </div>

        <div className="library-grid">
          {algorithms.map((algorithm) => (
            <article className="library-card" key={algorithm.id} aria-labelledby={`${algorithm.id}-title`}>
              <div className={`library-card-visual library-card-visual--${algorithm.id}`}>
                <span className="library-card-number">/ {algorithm.number}</span>
                <span className="library-card-method">{algorithm.method}</span>
                <AlgorithmArt algorithm={algorithm.id} />
              </div>
              <div className="library-card-content">
                <div className="library-card-meta">
                  <span className="library-level"><span />{algorithm.level}</span>
                  <span className="library-complexity" title="Average time complexity">{algorithm.complexity}</span>
                </div>
                <h3 id={`${algorithm.id}-title`}>{algorithm.name}</h3>
                <p className="library-card-description">{algorithm.description}</p>
                <div className="library-card-actions">
                  <Link className="library-challenge" to={`/algo/${algorithm.id}`} aria-label={`Challenge ${algorithm.name}`}>
                    <Icon name="play" size={15} />
                    Challenge
                    <Icon name="arrow-right" size={16} />
                  </Link>
                  <Link className="library-learn" to={`/moreOnAlgorithms/${algorithm.id}`} aria-label={`Learn ${algorithm.name}`}>
                    Learn the logic <Icon name="arrow-up-right" size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="library-start-note">
        <span className="library-note-icon"><Icon name="book" size={21} /></span>
        <div>
          <h2>New to sorting? You’re in the right place.</h2>
          <p>Start with Bubble Sort. Learn the steps, choose an easy pace, and make your first move.</p>
        </div>
        <Link to="/moreOnAlgorithms/bubble_sort">Start learning <Icon name="arrow-right" size={17} /></Link>
      </aside>
    </main>
  );
}
