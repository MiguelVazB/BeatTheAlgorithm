import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../images/left-arrow.svg";
import "./componentStyles/AlgoMenu.css";

export const AlgoMenu = ({ showMenuClick }) => {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);
  const menuRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close on click outside
  useEffect(() => {
    function onClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Prevent body scroll and compensate for scrollbar
  useEffect(() => {
    if (!closing) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = scrollBarWidth + "px";
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [closing]);

  // Fade-out logic
  function handleClose() {
    setClosing(true);
    setTimeout(() => {
      showMenuClick();
    }, 300); // match fadeOut duration
  }

  function handleLinkClick(toRoot) {
    handleClose();
    setTimeout(() => {
      if (toRoot) navigate("/");
      else navigate(0);
    }, 350);
  }

  return (
    <div className={`algoMenuOverlay${closing ? " fadeOut" : " fadeIn"}`}>
      <div
        className={`algoMenu${
          closing ? " fadeOutRight" : " fadeInRight"
        }`}
        ref={menuRef}
      >
        <img
          src={Arrow}
          onClick={handleClose}
          className="goBackArrow"
          alt="Go back"
        />
        <h1>Algorithms</h1>
        <div className="algoList">
          <Link
            className="algorithms"
            to="/algo/bubble_sort"
            onClick={() => handleLinkClick(false)}
          >
            Bubble Sort
          </Link>
          <Link
            className="algorithms"
            to="/algo/selection_sort"
            onClick={() => handleLinkClick(false)}
          >
            Selection Sort
          </Link>
          <Link
            className="algorithms"
            to="/algo/heap_sort"
            onClick={() => handleLinkClick(false)}
          >
            Heap Sort
          </Link>
          <Link
            className="algorithms"
            to="/algo/merge_sort"
            onClick={() => handleLinkClick(false)}
          >
            Merge Sort
          </Link>
          <Link
            className="algorithms"
            to="/algo/quick_sort"
            onClick={() => handleLinkClick(false)}
          >
            Quick Sort
          </Link>
        </div>
        <div className="menuButtons">
          <Link
            className="homeButtonMenu"
            to="/"
            onClick={() => handleLinkClick(true)}
          >
            Home
          </Link>
          <Link className="aboutButtonMenu" to="/about" onClick={handleClose}>
            About
          </Link>
          <Link
            className="aboutButtonMenu"
            to="/moreOnAlgorithms"
            onClick={handleClose}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};
