
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import forestImg from "./assets/forest2.png";
import "./styles/Decorations.css";
import RestartButton from "./RestartButton.jsx";
import cabinImg from "./assets/cabin.png";
import forestImg2 from "./assets/forest3.png";
import Progression from "./Progression.jsx";
import { useEffect } from "react";
import { updateProgress } from "./gameState.js";

const Forest = () => {
    const navigate = useNavigate();
     useEffect(() => {
            updateProgress("Forest");
        }, []);
    const story = useMemo (
        () => ({
            start: {
                bg: forestImg,
                lines: [
                    "Once upon a time, there was a girl named Little Red Riding Hood skipping through the forest.",
                    "She was dressed up with a Red Riding Hood, brown boots and carrying a small brown basket filled with goodies such as: sandwiches, medicine and other supplies to give to her grandmother.",
                    "Who just so happened to live deep in the forest.",
                    "As little Red Riding Hood was skipping along the path she comes to a stop when she sees that the path splits off into two directions.",
                ],
                next: "pathChoice",
                choices: null,
            },

            // Presented with choices that the player can pick
            pathChoice: {
                bg: forestImg,
                lines: ["One sign says: Grandmother's Cabin while the other sign says Mystic Lake.",

                ],
                choices: [
                { text: "Grandmother's Cabin", to: "goodResult" },
                { text: "Mystic Lake", to: "badResult"},
                ],
            },

            // Good path
            goodResult: {
                bg: cabinImg, 
                lines: [
                    "Little Red continues to follow the path to her Grandmother's cabin. She arrives there in no time seeing her Cabin appear in view."
                ],
                routeTo: "/cabin",
                choices: null,
            },

            //Bad path 
            badResult: {
                bg: forestImg2,
                lines: [
                    "Little Red Riding Hood skips towards the path to Mystic Lake when she meets the Big Bad Wolf!",
                    "He pounces onto Little Red Riding Hood and devours her alive.",
                    "The End. Ending 1 - Wrong Path Taken"
                ],
                routeTo: "/end",
                choices: null,
            },

            


        }),
        []
    );

const [nodeId, setNodeId] = useState("start");
const [lineIndex, setLineIndex] = useState(0);

const node = story[nodeId];
const lines = node.lines;
const isLastLine = lineIndex >= lines.length - 1;
const showChoices = isLastLine && Array.isArray(node.choices) && node.choices.length > 0;

const goNext = () => {
    if (!isLastLine) {
        setLineIndex((i) => i + 1);
        return;
    }

    // if node ends in routeTo, go there
    if (node.routeTo) {
        navigate(node.routeTo);
        return;
    }

    // if node has "next", advance
    if (!node.choices && node.next) {
        setNodeId(node.next);
        setLineIndex(0);
    }
};

const pickChoice = (to) => {
    setNodeId(to);
    setLineIndex(0);
};

return (
    <div className="scene">
        <img src={node.bg} className="sceneBG" alt="" />

        <div className="btnContainer">
        <Progression /> 
        <RestartButton />
</div>
        <div className="textbox">
            <p className="textboxText">{lines[lineIndex]}</p>

            <div className="textboxControls">
                {!showChoices ? (
                    <button className="btn" type="button" onClick={goNext}>{isLastLine ? "Continue" : "Next"}
                    </button>
                ) : ( 
                    <div className="choices">
                        {node.choices.map((c, idx) => (
                            <button key={idx} className="btn btnChoice" type="button" onClick={() => pickChoice(c.to)}>
                                {c.text}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
        
    </div>
);

};

export default Forest;
