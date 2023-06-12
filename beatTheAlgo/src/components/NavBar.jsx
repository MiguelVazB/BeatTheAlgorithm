import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav>
      <div className="hamburgerMenu">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Link to="/">Beat the Algorithm</Link>
      <Link to="/">Home</Link>
      <Link to="algorithms">Algorithms</Link>
      <Link to="about">About</Link>
    </nav>
  );
}
