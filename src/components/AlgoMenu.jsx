import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../images/left-arrow.svg";
import "./componentStyles/AlgoMenu.css";

export const AlgoMenu = ({ showMenuClick }) => {
  const navigate = useNavigate();

  return (
    <div className="algoMenu fadeInRight">
      <img src={Arrow} onClick={showMenuClick} className="goBackArrow" />
      <h1>Algorithms</h1>
      <div className="algoList">
        <Link
          className="algorithms"
          onClick={() => {
            showMenuClick();
            navigate("/BeatTheAlgorithm/algo/bubble_sort");
            window.location.reload();
          }}
        >
          Bubble Sort
        </Link>
        <Link
          className="algorithms"
          onClick={() => {
            showMenuClick();
            navigate("/BeatTheAlgorithm/algo/selection_sort");
            window.location.reload();
          }}
        >
          Selection Sort
        </Link>
        <Link
          className="algorithms"
          onClick={() => {
            showMenuClick();
            navigate("/BeatTheAlgorithm/algo/heap_sort");
            window.location.reload();
          }}
        >
          Heap Sort
        </Link>
        <Link
          className="algorithms"
          onClick={() => {
            showMenuClick();
            navigate("/BeatTheAlgorithm/algo/merge_sort");
            window.location.reload();
          }}
        >
          Merge Sort
        </Link>
        <Link
          className="algorithms"
          onClick={() => {
            showMenuClick();
            navigate("/BeatTheAlgorithm/algo/quick_sort");
            window.location.reload();
          }}
        >
          Quick Sort
        </Link>
        <Link
          className="algorithms"
          onClick={() => {
            showMenuClick();
            navigate("/BeatTheAlgorithm/algo/dfs");
            window.location.reload();
          }}
        >
          Depth-First Search
        </Link>
        <Link
          className="algorithms"
          onClick={() => {
            showMenuClick();
            navigate("/BeatTheAlgorithm/algo/bfs");
            window.location.reload();
          }}
        >
          Breadth-First Search
        </Link>
      </div>
      <div className="menuButtons">
        <Link
          className="homeButtonMenu"
          to="/BeatTheAlgorithm/"
          onClick={showMenuClick}
        >
          Home
        </Link>
        <Link
          className="aboutButtonMenu"
          to="/BeatTheAlgorithm/about"
          onClick={showMenuClick}
        >
          About
        </Link>
        <Link
          className="aboutButtonMenu"
          to="/BeatTheAlgorithm/moreOnAlgorithms"
          onClick={showMenuClick}
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};
