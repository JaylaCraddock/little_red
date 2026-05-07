import { useEffect, useMemo, useState } from "react";
import { getGameState, getSceneList, getTotalScenes } from "./gameState";
// import "./styles/Decorations.css";

function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}

export default function Progression() {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState(getGameState());

    const sceneList = useMemo(() => getSceneList(), []);
    const totalScenes = useMemo(() => getTotalScenes(), []);

    useEffect(() => {
        if (open) setState(getGameState());
    }, [open]);

    // const startedText = 
    // state.startedAt ? new Date(state.startedAt).toLocaleString() : "Not started";

    //Convert farthestScene into "Progress number"
    //We treat "Title" as 0, and House as 1 and so on
    const farthestIndex = sceneList.indexOf(state.farthestScene);
    const farthestSceneNumber = clamp(farthestIndex, 0, sceneList.length - 1);

    //If total scenes excludes title, then farthestSceneNumber already matches 0..8
    // Title = 0, House = 1, ..Scene 8 = 8

    const percent = totalScenes > 0 ? clamp((farthestSceneNumber / totalScenes) * 100, 0, 100) : 0;

    // export default Progression;

    return (
        <>
        <button className="progressBtn" type="button" onClick={() => setOpen(true)}>
            Progress
        </button>

        {open && (
            <div className="progressOverlay" role="dialog" aria-modal="true">
                <div className="progressCard">
                    <div className="progressHeader">
                     <h2 className="progressTitle">Your Progress</h2>
                     <button className="progressClose" type="button" onClick={() => setOpen(false)}>Close</button>
                     
                    </div>
                    <div className="progressBody">
                        {/* <p><strong>Started:</strong>{startedText}</p> */}
                        <p><strong>Current scene </strong>{state.currentScene}</p>
                        <p><strong>Farthest scene reached: </strong>{state.farthestScene}</p>

                        <hr className="progressHr" />

                        <p>
                            <strong>Progress:</strong> {farthestSceneNumber} / {totalScenes} scenes
                        </p>
                        <p>
                            <strong>Completion:</strong> {percent.toFixed(1)}%
                        </p>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}