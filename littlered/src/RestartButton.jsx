import { useNavigate } from "react-router-dom";
import { resetGameState } from "./gameState";
import "./styles/Decorations.css";

export default function RestartButton() {
    const navigate = useNavigate();

    const restart = () => {
        resetGameState();
        navigate("/");
    };

    return (
        <button className="restartBtn" type="button" onClick={restart}>Restart Story</button>
    );
}