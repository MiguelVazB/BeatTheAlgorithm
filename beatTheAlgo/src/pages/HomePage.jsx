import NavBar from "../components/NavBar";
import "./HomePage.css";
import HeadAlgo from "../images/head-white.png";

export default function HomePage() {
  return (
    <main className="homePage">
      <div className="challengeUser">
        <p>Do YOU have what it takes to Beat the Algorithm?</p>
        <img src={HeadAlgo} className="headAlgo" />
      </div>
    </main>
  );
}
