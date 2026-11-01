import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import "./pageStyles/NotFoundPage.css";

export default function NotFound() {
  return (
    <main className="empty-state">
      <span className="empty-state-mark"><Icon name="search" size={28} /></span>
      <span className="eyebrow">404 / A little out of order</span>
      <h1>Let’s get you back on track.</h1>
      <p>This page isn’t in the list. There’s a good challenge waiting for you, though.</p>
      <Link className="button-primary" to="/moreOnAlgorithms">Explore the algorithms <Icon name="arrow-right" size={17} /></Link>
    </main>
  );
}
