import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import "./pageStyles/NotFoundPage.css";
import "./pageStyles/WorkInProgressPage.css";

export default function WorkInProgressPage() {
  return (
    <main className="empty-state empty-state--progress">
      <span className="empty-state-mark"><Icon name="code" size={28} /></span>
      <span className="eyebrow">A work in progress</span>
      <h1>More good challenges ahead.</h1>
      <p>This part of the playground is still taking shape. Try one of the sorting challenges in the meantime.</p>
      <Link className="button-primary" to="/moreOnAlgorithms">Find a challenge <Icon name="arrow-right" size={17} /></Link>
    </main>
  );
}
