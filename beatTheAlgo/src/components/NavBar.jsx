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
      <div className="algoMenu">
        <p>hi</p>
        <p>hi</p>
        <p>hi</p>
        <p>hi</p>
      </div>
    </nav>
  );
}
