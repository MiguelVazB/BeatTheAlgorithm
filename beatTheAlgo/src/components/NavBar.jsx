import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";
import { AlgoMenu } from "./AlgoMenu";

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  function showMenuClick() {
    setShowMenu((prev) => !prev);
  }

  return (
    <>
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
          <Link className="navFont" to="moreOnAlgorithms">
            <p>More on Algorithms</p>
          </Link>
          <Link className="navFont" to="about">
            <p>About</p>
          </Link>
        </div>
        {showMenu && <AlgoMenu showMenuClick={showMenuClick} />}
      </nav>
    </>
  );
}
