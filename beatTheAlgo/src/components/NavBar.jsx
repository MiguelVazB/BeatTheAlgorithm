import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navBar">
      <div className="logo">
        <div className="hamburgerMenu">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Link className="navFont" to="/">
          Beat the Algorithm
        </Link>
      </div>
      <div className="links">
        <Link className="navFont" to="/">
          Home
        </Link>
        <Link className="navFont" to="algorithms">
          Algorithms
        </Link>
        <Link className="navFont" to="about">
          About
        </Link>
      </div>
    </nav>
  );
}
