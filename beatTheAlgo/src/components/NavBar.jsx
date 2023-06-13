import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";
import Arrow from "../images/left-arrow.svg";

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  function showMenuClick() {
    setShowMenu((prev) => !prev);
  }

  return (
    <nav className="navBar">
      <div className="logo">
        <div className="hamburgerMenu" onClick={showMenuClick}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Link className="navFont" to="/">
          <p>Beat the Algorithm</p>
        </Link>
      </div>
      <div className="links">
        <Link className="navFont" to="/">
          <p>Home</p>
        </Link>
        <Link className="navFont" to="algorithms">
          <p>Algorithms</p>
        </Link>
        <Link className="navFont" to="about">
          <p>About</p>
        </Link>
      </div>
      {showMenu && (
        <div className="algoMenu">
          <img src={Arrow} onClick={showMenuClick} className="goBackArrow" />
          <h1>Algorithms</h1>
          <div className="algoList">
            <p>Algorithm_1</p>
            <p>Algorithm_2</p>
            <p>Algorithm_3</p>
            <p>Algorithm_4</p>
            <p>Algorithm_5</p>
            <p>Algorithm_6</p>
            <p>Algorithm_7</p>
          </div>
          <div className="menuButtons">
            <button className="homeButtonMenu">Home</button>
            <button className="aboutButtonMenu">About</button>
          </div>
        </div>
      )}
    </nav>
  );
}
