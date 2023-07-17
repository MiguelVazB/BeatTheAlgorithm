import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../images/left-arrow.svg";
import "./componentStyles/AlgoMenu.css";

export const AlgoMenu = ({ showMenuClick }) => {
  const navigate = useNavigate();

  function handleClick() {
    showMenuClick();
    setTimeout(() => {
      navigate(0);
    });
  }

  return (
    <div className="algoMenu fadeInRight">
      <img src={Arrow} onClick={showMenuClick} className="goBackArrow" />
      <h1>Algorithms</h1>
      <div className="algoList">
        <Link
          className="algorithms"
          to="/algo/bubble_sort"
          onClick={handleClick}
        >
          Bubble Sort
        </Link>
        <Link
          className="algorithms"
          to="/algo/selection_sort"
          onClick={handleClick}
        >
          Selection Sort
        </Link>
        <Link className="algorithms" to="/algo/heap_sort" onClick={handleClick}>
          Heap Sort
        </Link>
        <Link
          className="algorithms"
          to="/algo/merge_sort"
          onClick={handleClick}
        >
          Merge Sort
        </Link>
        <Link
          className="algorithms"
          to="/algo/quick_sort"
          onClick={handleClick}
        >
          Quick Sort
        </Link>
        <Link className="algorithms" to="/algo/dfs" onClick={handleClick}>
          Depth-First Search
        </Link>
        <Link className="algorithms" to="/algo/bfs" onClick={handleClick}>
          Breadth-First Search
        </Link>
      </div>
      <div className="menuButtons">
        <Link className="homeButtonMenu" to="/" onClick={showMenuClick}>
          Home
        </Link>
        <Link className="aboutButtonMenu" to="/about" onClick={showMenuClick}>
          About
        </Link>
        <Link
          className="aboutButtonMenu"
          to="/moreOnAlgorithms"
          onClick={showMenuClick}
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};
