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
        <Link className="algorithms" to="algo/algo1" onClick={showMenuClick}>
          Algorithm_1
        </Link>
        <Link className="algorithms" to="algo/algo2" onClick={showMenuClick}>
          Algorithm_2
        </Link>
        <Link className="algorithms" to="algo/algo3" onClick={showMenuClick}>
          Algorithm_3
        </Link>
        <Link className="algorithms" to="algo/algo4" onClick={showMenuClick}>
          Algorithm_4
        </Link>
        <Link className="algorithms" to="algo/algo5" onClick={showMenuClick}>
          Algorithm_5
        </Link>
        <Link className="algorithms" to="algo/algo6" onClick={showMenuClick}>
          Algorithm_6
        </Link>
      </div>
      <div className="menuButtons">
        <Link className="homeButtonMenu" to="/">
          Home
        </Link>
        <Link className="aboutButtonMenu" to="about">
          About
        </Link>
      </div>
    </div>
  );
};
