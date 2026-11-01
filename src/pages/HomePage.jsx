import { Link } from 'react-router-dom';
import AlgorithmArt from '../components/AlgorithmArt';
import Icon from '../components/Icon';
import SortingPreview from '../components/SortingPreview';
import './pageStyles/HomePage.css';

const challenges = [
  { id: 'bubble_sort', number: '01', name: 'Bubble sort', idea: 'Little swaps. Big progress.', level: 'Start here', complexity: 'O(n²)' },
  { id: 'selection_sort', number: '02', name: 'Selection sort', idea: 'Find the smallest. Find your rhythm.', level: 'Beginner', complexity: 'O(n²)' },
  { id: 'heap_sort', number: '03', name: 'Heap sort', idea: 'A different way to get to the top.', level: 'Intermediate', complexity: 'O(n log n)' },
  { id: 'merge_sort', number: '04', name: 'Merge sort', idea: 'Break it down. Bring it together.', level: 'Intermediate', complexity: 'O(n log n)' },
  { id: 'quick_sort', number: '05', name: 'Quick sort', idea: 'Pick a pivot. Give every value a side.', level: 'Intermediate', complexity: 'O(n log n)' },
];
const steps = [
  { number: '01', icon: 'target', title: 'Pick your challenge', text: 'Choose an algorithm and a difficulty that feels right. There’s room to experiment.' },
  { number: '02', icon: 'play', title: 'Make your move', text: 'Put the numbers in order while the algorithm works alongside you. Can you finish first?' },
  { number: '03', icon: 'spark', title: 'Make it click', text: 'Explore each step, understand the approach, and come back with a better strategy.' },
];
export default function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <span className="eyebrow home-eyebrow"><span className="eyebrow-dot" />Less theory. More “I get it.”</span>
          <h1 id="home-title">Think fast.<br />Sort <span>faster<svg viewBox="0 0 280 16" aria-hidden="true"><path d="M3 11C65 2 195 1 277 8" /></svg></span>.</h1>
          <p>A hands-on playground for algorithms. Race the computer, try a new approach, and make the theory click.</p>
          <div className="home-hero-actions"><Link className="button-primary" to="/algo/bubble_sort">Let’s play <Icon name="arrow-up-right" size={18} /></Link><Link className="home-explore-link" to="/moreOnAlgorithms">Explore algorithms <Icon name="arrow-right" size={17} /></Link></div>
          <div className="home-hero-note"><span className="home-note-icon"><Icon name="check" size={13} /></span>No sign-up. Just you and the algorithm.</div>
        </div>
        <div className="home-hero-visual"><div className="home-visual-coordinate" aria-hidden="true">[ curiosity → understanding ]</div><SortingPreview /></div>
      </section>
      <div className="home-feature-strip"><span><Icon name="code" size={17} />{challenges.length} sorting algorithms</span><span><Icon name="layers" size={17} />4 difficulty levels</span><span><Icon name="book" size={17} />Learn by doing</span><span className="home-strip-trailing">Made for your next “aha.” <Icon name="spark" size={15} /></span></div>
      <section className="home-challenges" aria-labelledby="challenges-title">
        <div className="home-section-intro"><span className="eyebrow">Choose your opponent</span><h2 id="challenges-title">A little challenge.<br />A new way to think.</h2><p>Meet the algorithms behind the theory. Start simple, then work your way up.</p><Link to="/moreOnAlgorithms" className="text-link">See the playground <Icon name="arrow-right" size={17} /></Link><div className="home-start-note"><span className="home-start-arrow" aria-hidden="true">↗</span>New around here?<br /><strong>Bubble sort is a great first move.</strong></div></div>
        <div className="home-challenge-list">{challenges.map((challenge) => <Link to={`/algo/${challenge.id}`} className="home-challenge-row" key={challenge.id}><span className="home-challenge-number">{challenge.number}</span><div className="home-challenge-art"><AlgorithmArt algorithm={challenge.id} compact /></div><div className="home-challenge-info"><span className="home-challenge-level">{challenge.level}</span><h3>{challenge.name}</h3><p>{challenge.idea}</p></div><span className="home-challenge-complexity">{challenge.complexity}</span><span className="home-challenge-arrow"><Icon name="arrow-up-right" size={20} /></span></Link>)}</div>
      </section>
      <section className="home-how" aria-labelledby="how-title"><div className="home-how-heading"><span className="eyebrow">Simple by design</span><h2 id="how-title">Play it. See it. Get it.</h2><p>You don’t need to be an expert.<br />You just need to be curious.</p></div><div className="home-steps">{steps.map((step) => <article className="home-step" key={step.number}><div className="home-step-top"><span>{step.number}</span><Icon name={step.icon} size={22} /></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>
      <section className="home-bottom-cta"><div><span className="eyebrow">Your next move</span><h2>Ready to give your brain<br />a different kind of workout?</h2></div><Link to="/algo/bubble_sort" className="button-primary">Take the challenge <Icon name="arrow-up-right" size={18} /></Link><div className="home-cta-art" aria-hidden="true">{[22, 45, 67, 91, 116].map((height) => <span key={height} style={{ height }} />)}</div></section>
    </main>
  );
}
