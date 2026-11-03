import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Icon from "../Icon";

const formatAlgorithm = (algo) => String(algo).split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

export const GameDialog = ({ children, className, overlayRef, labelId }) => {
  function keepFocusInDialog(event) {
    if (event.key !== "Tab") return;
    const controls = event.currentTarget.querySelectorAll('a[href], button:not([disabled]), select, [tabindex="0"]');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (!first) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return <div className={`overlay ${className}`} ref={overlayRef} role="dialog" aria-modal="true" aria-labelledby={labelId} onKeyDown={keepFocusInDialog}>{children}</div>;
};

export const WinnerOverlay = ({ winner, algo, onRestart }) => {
  const { width, height } = useWindowSize();
  const userWon = winner === "user";

  return (
    <GameDialog className="winner" labelId="game-result-title">
      {userWon && <Confetti width={width} height={height} recycle={false} numberOfPieces={160} colors={["#e45e35", "#8eaa82", "#d6b779", "#202622"]} />}
      <div className="game-result-card">
        <div className={`game-result-mark ${userWon ? "is-win" : ""}`}><Icon name={userWon ? "check" : "refresh"} size={30} /></div>
        <p className="game-eyebrow">Challenge complete</p>
        <h2 id="game-result-title">{userWon ? "You beat the algorithm." : "The algorithm takes this one."}</h2>
        <p>{userWon ? "A little intuition goes a long way. Ready to do it again?" : "Every attempt sharpens your thinking. Give it another go or explore how the algorithm works."}</p>
        <div className="game-result-actions">
          <button type="button" className="game-primary-button" onClick={onRestart} autoFocus><Icon name="refresh" size={17} />{userWon ? "Play again" : "Try again"}</button>
          <Link className="game-secondary-button" to={`/moreOnAlgorithms/${algo}`}><Icon name="book" size={17} />Learn the algorithm</Link>
        </div>
        <Link className="game-back-link" to="/moreOnAlgorithms">Explore another algorithm <Icon name="arrow-right" size={15} /></Link>
      </div>
    </GameDialog>
  );
};

export const AlgorithmHeader = ({ algo, difficulty, songPlaying, onToggleMusic, countDownOver }) => (
  <header className="algorithmDisplayed">
    <div className="game-heading">
      <Link className="game-back-link" to="/moreOnAlgorithms">The playground <Icon name="chevron-right" size={13} /></Link>
      <div className="nameAndDifficulty">
        <h1>{formatAlgorithm(algo)}</h1>
        <span className="game-difficulty-badge">{difficulty || "Practice your intuition"}</span>
      </div>
      <p>Think fast. Sort smart. Beat the algorithm.</p>
    </div>
    <div className="game-header-controls">
      <Link className="game-learn-link" to={`/moreOnAlgorithms/${algo}`}><Icon name="book" size={17} /><span>How it works</span></Link>
      {songPlaying !== undefined && (
        <button type="button" className="BackgroundSongBtn" onClick={onToggleMusic} aria-label={songPlaying ? "Mute background music" : "Play background music"} aria-pressed={songPlaying} disabled={!countDownOver} title={songPlaying ? "Mute background music" : "Play background music"}>
          <Icon name={songPlaying ? "volume" : "volume-off"} size={19} />
        </button>
      )}
    </div>
  </header>
);

export const GameContainer = ({ algo, computerSide, userSide }) => {
  const largerBoard = algo === "heap_sort" || algo === "merge_sort";
  const playerHints = {
    bubble_sort: "Pop the numbers from smallest to largest.",
    selection_sort: "Select two numbers to swap their places.",
    quick_sort: "Swap pairs of numbers to sort your row from smallest to largest.",
    insertion_sort: "Select a number, then its new position. The values between them shift.",
    heap_sort: "Pick up a number, then choose where to place it.",
    merge_sort: "Build your answer above, from smallest to largest.",
  };

  return (
    <div className={`game-boards ${largerBoard ? "game-boards-large" : ""}`}>
      <section className={`${largerBoard ? "computerSideBigger" : "computerSide"} game-panel`} aria-labelledby="computer-side-title">
        <div className="game-panel-heading">
          <div><span className="game-side-marker computer-marker" aria-hidden="true" /><h2 id="computer-side-title">The algorithm</h2><span className="game-side-type">Computer</span></div>
          <p>Watch the method in motion.</p>
        </div>
        <div className="game-board-content">{computerSide}</div>
      </section>
      <section className="userSide game-panel" aria-labelledby="player-side-title">
        <div className="game-panel-heading">
          <div><span className="game-side-marker player-marker" aria-hidden="true" /><h2 id="player-side-title">Your move</h2><span className="game-side-type">Human</span></div>
          <p>{playerHints[algo]}</p>
        </div>
        <div className="game-board-content">{userSide}</div>
      </section>
    </div>
  );
};

GameDialog.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  overlayRef: PropTypes.shape({ current: PropTypes.any }),
  labelId: PropTypes.string.isRequired,
};

WinnerOverlay.propTypes = {
  winner: PropTypes.oneOf(["user", "computer"]).isRequired,
  algo: PropTypes.string.isRequired,
  onRestart: PropTypes.func.isRequired,
};

AlgorithmHeader.propTypes = {
  algo: PropTypes.string.isRequired,
  difficulty: PropTypes.string,
  songPlaying: PropTypes.bool,
  onToggleMusic: PropTypes.func,
  countDownOver: PropTypes.bool,
};

GameContainer.propTypes = {
  algo: PropTypes.string.isRequired,
  computerSide: PropTypes.node.isRequired,
  userSide: PropTypes.node.isRequired,
};
