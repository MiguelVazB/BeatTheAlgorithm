import { Link } from "react-router-dom";
import { useState } from "react";
import "./componentStyles/NavBar.css";
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
          <Link className="navFont" to="/" onClick={() => setShowMenu(false)}>
            <p>Beat the Algorithm</p>
          </Link>
        </div>
        <div className="links">
          <Link className="navFont" to="/" onClick={() => setShowMenu(false)}>
            <p>Home</p>
          </Link>
          <Link
            className="navFont"
            to="moreOnAlgorithms"
            onClick={() => setShowMenu(false)}
          >
            <p>More on Algorithms</p>
          </Link>
          <Link
            className="navFont"
            to="about"
            onClick={() => setShowMenu(false)}
          >
            <p>About</p>
          </Link>
        </div>
        {showMenu && <AlgoMenu showMenuClick={showMenuClick} />}
      </nav>
    </>
  );
}
