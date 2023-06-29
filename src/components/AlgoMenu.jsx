import React from "react";
import { Link } from "react-router-dom";
import Arrow from "../images/left-arrow.svg";
import "./componentStyles/AlgoMenu.css";

export const AlgoMenu = ({ showMenuClick }) => {
  return (
    <div className="algoMenu">
      <img src={Arrow} onClick={showMenuClick} className="goBackArrow" />
      <h1>Algorithms</h1>
      <div className="algoList">
        <Link
          className="algorithms"
          to="algo/bubble_sort"
          onClick={showMenuClick}
        >
          Bubble Sort
        </Link>
        <Link
          className="algorithms"
          to="algo/selection_sort"
          onClick={showMenuClick}
        >
          Selection Sort
        </Link>
        <Link
          className="algorithms"
          to="algo/heap_sort"
          onClick={showMenuClick}
        >
          Heap Sort
        </Link>
        <Link
          className="algorithms"
          to="algo/merge_sort"
          onClick={showMenuClick}
        >
          Merge Sort
        </Link>
        <Link
          className="algorithms"
          to="algo/quick_sort"
          onClick={showMenuClick}
        >
          Quick Sort
        </Link>
        <Link className="algorithms" to="algo/dfs" onClick={showMenuClick}>
          Depth-First Search
        </Link>
        <Link className="algorithms" to="algo/bfs" onClick={showMenuClick}>
          Breadth-First Search
        </Link>
      </div>
      <div className="menuButtons">
        <Link className="homeButtonMenu" to="/" onClick={showMenuClick}>
          Home
        </Link>
        <Link className="aboutButtonMenu" to="about" onClick={showMenuClick}>
          About
        </Link>
        <Link
          className="aboutButtonMenu"
          to="moreOnAlgorithms"
          onClick={showMenuClick}
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};
