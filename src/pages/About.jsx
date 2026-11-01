import "./pageStyles/About.css";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";

export default function About() {
  return (
    <main className="about-page">
      <div className="about-intro">
        <div className="about-intro-copy">
          <p className="about-eyebrow">A little about this project</p>
          <h1>Big ideas.<br />A little friendly<br /><span>competition.</span></h1>
          <p className="about-lead">Algorithms make more sense when you can play with them. That’s the idea behind Beat the Algorithm.</p>
          <Link className="about-primary-link" to="/algo/bubble_sort">Try a challenge <Icon name="arrow-right" size={18} /></Link>
        </div>
        <div className="about-sorting-note" aria-label="The same numbers, a new perspective">
          <div className="about-note-top"><span>A new perspective</span><Icon name="code" size={20} /></div>
          <div className="about-sort-row about-sort-unsorted" aria-hidden="true">
            {[42, 16, 58, 8, 31].map((number) => <span key={number} style={{ "--bar-height": `${number + 30}px` }}>{number}</span>)}
          </div>
          <div className="about-sort-divider"><span>A little curiosity goes a long way</span><Icon name="arrow-right" size={18} /></div>
          <div className="about-sort-row about-sort-sorted" aria-hidden="true">
            {[8, 16, 31, 42, 58].map((number) => <span key={number} style={{ "--bar-height": `${number + 30}px` }}>{number}</span>)}
          </div>
          <p>Same numbers. A better understanding.</p>
        </div>
      </div>
      <section className="about-project-section" aria-labelledby="about-project-title">
        <div className="about-section-label"><span>01 / The idea</span><h2 id="about-project-title">Learn by doing.</h2></div>
        <div className="about-section-body">
          <p>Sort the numbers yourself while an algorithm works beside you. Watch how it compares, swaps, and finds order, then see if you can get there first.</p>
          <p>Four sorting challenges, adjustable difficulty, and step-by-step explanations make it easy to start small and keep exploring.</p>
          <Link className="about-text-link" to="/moreOnAlgorithms">Explore the algorithms <Icon name="arrow-up-right" size={17} /></Link>
        </div>
      </section>
      <section className="about-project-section" aria-labelledby="about-creator-title">
        <div className="about-section-label"><span>02 / The creator</span><h2 id="about-creator-title">Hi, I’m Miguel.</h2></div>
        <div className="about-section-body">
          <p>I’m Miguel Vazquez, the developer behind Beat the Algorithm. I built this project to bring together two things I enjoy: understanding how things work and creating experiences for the web.</p>
          <p>Have an idea, a question, or feedback? I’d love to hear it.</p>
          <div className="about-contact-links">
            <a className="about-text-link" href="mailto:miguel.beatalgo@gmail.com">Send me an email <Icon name="arrow-up-right" size={17} /></a>
            <a className="about-text-link" href="https://www.linkedin.com/in/miguel-vazquez-software-engineer/" target="_blank" rel="noreferrer">LinkedIn <Icon name="arrow-up-right" size={17} /></a>
          </div>
        </div>
      </section>
      <div className="about-bottom-note">Made with curiosity. Built for yours.</div>
    </main>
  );
}
