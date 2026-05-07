import { useNavigate } from "react-router-dom";
import gameOverImg from "./assets/GAME OVER.png";
import { resetGameState } from "./gameState";
import "./styles/Decorations.css";

//This is the game over screen that you will see

const End = () => {
  const navigate = useNavigate();

  const restart = () => {
    resetGameState();
    navigate("/");
  };

  return (
    <div className="go">
      <img src={gameOverImg} className="goBG" alt="Game Over background" />
      <div className="goOverlay">
        <button className="goBtn" type="button" onClick={restart}>
          Restart Adventure
        </button>
      </div>
    </div>
  );
};

export default End;