import "./pageStyles/HomePage.css";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import bubbleSortImg from "../images/bubble_sort.jpg";
import mergeSortImg from "../images/merge_sort.jpg";
import selectionSortImg from "../images/selection_sort.jpg";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Animation states
  const [challengeDisplayed, SetChallengeDisplayed] = useState(false);
  const [solveBoxDisplayed, SetSolveBoxDisplayed] = useState(false);
  const [learnBoxDisplayed, SetLearnBoxDisplayed] = useState(false);

  // Refs for sections
  const heroSectionRef = useRef(null);
  const featuredAlgosRef = useRef(null);
  const callToActionRef = useRef(null);
  const startBtnRef = useRef(null);

  // Initialize animations after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Fade-in-up animation observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Stagger animations for algo cards
          if (entry.target.classList.contains('algo-card')) {
            const delay = entry.target.dataset.delay || 0;
            entry.target.style.transitionDelay = `${delay}s`;
          }
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px' // Triggers slightly before element enters viewport
    });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Section animations with glow effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("hero-section")) {
              entry.target.classList.add("active");
              setTimeout(() => {
                SetChallengeDisplayed(true);
              }, 500);
            } else if (entry.target.classList.contains("featured-algorithms")) {
              entry.target.classList.add("active");
              setTimeout(() => {
                SetSolveBoxDisplayed(true);
              }, 500);
            } else if (entry.target.classList.contains("cta-section")) {
              entry.target.classList.add("active");
              setTimeout(() => {
                SetLearnBoxDisplayed(true);
              }, 500);
            }
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    if (heroSectionRef.current) observer.observe(heroSectionRef.current);
    if (featuredAlgosRef.current) observer.observe(featuredAlgosRef.current);
    if (callToActionRef.current) observer.observe(callToActionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Apply glow effects on section activation
  useEffect(() => {
    if (challengeDisplayed && heroSectionRef.current)
      heroSectionRef.current.classList.add("glow-effect-left");
    if (solveBoxDisplayed && featuredAlgosRef.current)
      featuredAlgosRef.current.classList.add("glow-effect-right");
    if (learnBoxDisplayed && callToActionRef.current)
      callToActionRef.current.classList.add("glow-effect-left");
  }, [challengeDisplayed, solveBoxDisplayed, learnBoxDisplayed]);

  return (
    <main className={`homePage ${isLoaded ? 'page-loaded' : ''}`}>
      <section ref={heroSectionRef} className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content animate-on-scroll slide-up-fade">
          <h1 className="animate-on-scroll scale-in-fade" style={{transitionDelay: '0.3s'}}>
            Challenge Yourself Against the Machine
          </h1>
          <p className="animate-on-scroll slide-up-fade" style={{transitionDelay: '0.5s'}}>
            Beat the Algorithm is an interactive platform where you can test your problem-solving 
            skills against various algorithms. Learn about their inner workings and see if 
            you can outsmart the code.
          </p>
          <Link
            ref={startBtnRef}
            className="start-button group animate-on-scroll pop-in"
            style={{transitionDelay: '0.7s'}}
            to="/algo/bubble_sort"
          >
            <span>Start Your First Challenge</span>
            <span className="material-icon">arrow_forward</span>
            <span className="button-glow"></span>
          </Link>
        </div>
      </section>

      <section ref={featuredAlgosRef} className="featured-algorithms" id="featured-algorithms">
        <h2 className="animate-on-scroll slide-up-fade">Featured Algorithms</h2>
        <div className="algo-cards">
          <Link to="/algo/bubble_sort" className="algo-card animate-on-scroll slide-up-fade" data-delay="0">
            <div className="card-glow blue-glow"></div>
            <div className="algo-image" style={{backgroundImage: `url(${bubbleSortImg})`}}>
              <div className="image-overlay"></div>
            </div>
            <div className="algo-content">
              <h3>Bubble Sort</h3>
              <p>A simple comparison sorting algorithm that repeatedly steps through the list and swaps adjacent elements if they're in the wrong order.</p>
            </div>
          </Link>
          
          <Link to="/algo/selection_sort" className="algo-card animate-on-scroll slide-up-fade" data-delay="0.2">
            <div className="card-glow green-glow"></div>
            <div className="algo-image" style={{backgroundImage: `url(${selectionSortImg})`}}>
              <div className="image-overlay"></div>
            </div>
            <div className="algo-content">
              <h3>Selection Sort</h3>
              <p>Sort by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.</p>
            </div>
          </Link>
          
          <Link to="/algo/merge_sort" className="algo-card animate-on-scroll slide-up-fade" data-delay="0.4">
            <div className="card-glow purple-glow"></div>
            <div className="algo-image" style={{backgroundImage: `url(${mergeSortImg})`}}>
              <div className="image-overlay"></div>
            </div>
            <div className="algo-content">
              <h3>Merge Sort</h3>
              <p>An efficient, stable, divide-and-conquer sorting algorithm that produces a sorted array by merging sorted subarrays.</p>
            </div>
          </Link>
        </div>
      </section>

      <section ref={callToActionRef} className="cta-section animate-on-scroll fade-in">
        <div className="cta-glow"></div>
        <h2 className="animate-on-scroll slide-up-fade" style={{transitionDelay: '0.2s'}}>Ready to Take on the Challenge?</h2>
        <p className="animate-on-scroll slide-up-fade" style={{transitionDelay: '0.4s'}}>
          Put your skills to the test. Every challenge you conquer improves your 
          problem-solving abilities and deepens your understanding of algorithms.
        </p>
        <Link 
          className="view-all-button group animate-on-scroll pop-in" 
          style={{transitionDelay: '0.6s'}}
          to="/moreonalgorithms"
        >
          <span>View All Challenges</span>
          <span className="material-icon">east</span>
          <span className="button-glow"></span>
        </Link>
      </section>
    </main>
  );
}