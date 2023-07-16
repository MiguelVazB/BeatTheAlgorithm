import "./pageStyles/About.css";
import gitHubLogo from "../images/githubLogo.png";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="aboutPage">
      <div className="welcome">
        Welcome to <span>Beat the Algorithm</span>
      </div>
      <div className="aboutWebsite">
        <span className="webName">Beat the Algorithm</span> is an interactive
        website that provides a platform for users to{" "}
        <span className="important">challenge</span> themselves against various{" "}
        <span className="important">algorithms</span>. The goal is to{" "}
        <span className="important">solve a given problem faster</span> than the
        algorithm itself. In the process, the users will{" "}
        <span className="important">learn</span> about the{" "}
        <span className="important">inner workings</span> of the algorithms.
      </div>
      <div className="aboutMeTitle">About Me</div>
      <div className="aboutMe">
        <p>
          Welcome to Beat the Algorithm! My name is{" "}
          <span className="important">Miguel Vazquez</span>, and I am the
          driving force behind this website. As the sole creator and founder, I
          am passionate about algorithms and web development. I've always been
          in love with technology and the things we can do with it. I strive to
          improving myself and get better through hard work and perseverance.
        </p>
      </div>
      <div className="inTouch">Get in Touch</div>
      <div>
        I would love to hear from you! Whether you have a question, feedback, or
        just want to say hello, feel free to reach out to me at{" "}
        <span className="important">miguel.beatalgo@gmail.com</span>. I value
        your input and am always looking for ways to improve.{" "}
        <span className="important">
          Thank you for visiting Beat the Algorithm.
        </span>{" "}
        I am thrilled to have you here, and I look forward to you having fun
        beating the algorithm!
      </div>
      <div>
        <Link
          to="https://github.com/MiguelVazB/BeatTheAlgorithm"
          target="_blank"
          className="gitHubLink"
        >
          <img src={gitHubLogo} />
          https://github.com/MiguelVazB/BeatTheAlgorithm
        </Link>
      </div>
    </main>
  );
}
