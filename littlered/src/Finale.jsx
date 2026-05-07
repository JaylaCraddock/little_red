
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Decorations.css";
import RestartButton from "./RestartButton.jsx";
import Progression from "./Progression.jsx";
import { useEffect } from "react";
import { updateProgress } from "./gameState.js";

//images
import livingImg from "./assets/inside_cabin.png";
import bedroomImg from "./assets/bedroom.jpg";
import thankyouImg from "./assets/thank_you.png";



const Finale = () => {
    const navigate = useNavigate();
     useEffect(() => {
            updateProgress("Finale");
        }, []);
    const story = useMemo (
        () => ({
            start:  {
                // change image to grandma's house inside
                bg: livingImg,
                lines: [
                    "Inside, the Huntsman and Little Red split up and search throughout the cabin in all the rooms with the last room being Grandma's bedroom.",
                   
                 
                    
                ],
                next: "continueFinale2",
                choices: null,
            },


            continueFinale2: {
                //change this image to grandma's bedroom
                bg: bedroomImg,
                lines: ["As Little Red goes into the bedroom she hears some noises coming from the closet. She cautiously peeks through to open it wide when she sees that Grandma is there!",
                     "Albeit a little disorientated from being knocked out earlier from the wolf.",
                   

                ],
                next: "continueFinale3",
                choices: null,
            
            },


            continueFinale3: {
                //add picture of grandma's bedroom
                bg: bedroomImg, 
                lines: [
                    "Little Red - Grandma! There you are! What happened to you? Are you okay?  There was a big bad wolf that was after me. But, don't worry he's gone now! The Huntsman took care of him and now we're saved! ",
                     
                     "Still a little disorientated but, still smiling says:", 
                     
                     "Grandma - Little Red I'm so glad you're okay! I don't remember too much. I swear I was outside when I heard a knock on the door when, suddenly something really hard hit my head!",

                     "The Huntsman comes into the bedroom where Little Red and Grandma are speaking and joins the conversation.",

                     "Huntsman - Hello Granny I'm the huntsman, your nearby neighbor, I'm glad you're okay. Your granddaughter came to me in a panic when she told me that a wolf was after her while you went missing!",

                     "Grandma - Ah, the huntsman, thank you for protecting my granddaughter from that terrible, terrible wolf.",

                    "Grandma - Would you care for some dinner as a reward for saving my granddaughter?",

                    "Huntsman - Oh, I would love to join for some of your delicious food. Thank you",

                    "Little Red - I'll go ahead and patch you up grandma! I don't want you working too hard.",

                    "Huntsman - I'll help out too and prepare the table.",

                    "Grandma - Aw, thank you everyone! We'll be having wolf stew for dinner!",

                    "And they all lived happily ever after.",
                ],
                next: "continueFinale4",
                choices: null,
            },


 continueFinale4: {
                //add picture of congrats and thank you!
                bg: thankyouImg, 
                lines: [
                   "You completed the game! Thank you so much for playing",
                ],
                //add start over button
                routeFive: "/",
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

    // if node ends in routeFive, go there
    if (node.routeFive) {
        navigate(node.routeFive);
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

export default Finale;

