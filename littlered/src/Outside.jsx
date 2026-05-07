

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Decorations.css";
import RestartButton from "./RestartButton.jsx";
import Progression from "./Progression.jsx";
import { useEffect, useRef } from "react";
import { updateProgress } from "./gameState.js";
import useSound from "use-sound";
import gunShotSfx from "./assets/128301__xenonn__layered-gunshot-9.wav";

import creepyForestImg from "./assets/creepy_forest2.png";
import cabinTwoImg from "./assets/cabin2.jpg";
import doorClosedImg from "./assets/doorClosed.png";
import doorOpenHuntsmanImg from "./assets/doorOpenedHuntsman.png";
import livingRoomImg from "./assets/livingRoom.png";
import creepyForestTwoImg from "./assets/creepy_forest.webp";
import gunImg from "./assets/gun.png";
import cabinImg from "./assets/cabin.png";


const Outside = () => {
    const navigate = useNavigate();
    
     const [playGunShot] = useSound(gunShotSfx, {
        volume: 0.8,
        interrupt: true,
     });

//      const playGunShot = () => {
//         const a = gunShotAudioRef.current;
//         if (!a) return;
//         a.pause();
//         a.currentTime = 0;
//         a.play().catch(() => {
// //ignored (auto play restrictions)
//         });
//      };

     useEffect(() => {
            updateProgress("Outside");
        }, []);
    const story = useMemo (
        () => ({
            start: {
                // add the creepy forest image
                bg: creepyForestImg,
                lines: [
                    "Outside, Little Red runs through the dark forest. With the sounds of nightly creatures nearby sounding off their presence.",
                   
                ],
                next: "continueOutside",
                choices: null,
            },


            continueOutside: {
                //change this image to a different cabin the hunter's cabin
                bg: cabinTwoImg,
                lines: ["She finally arrives at her Grandmother's neighbor Cabin, where the Huntsman lives.",
                

                ],
                next: "continueOutsidePart2",
                choices: null,
            
            },

            // Continue and show different pictures for this part
            continueOutsidePart2: {
                //add picture of door closed of Little Red knocking on the door
                bg: doorClosedImg, 
                lines: [
                    "Little Red frantically bangs on the door saying: ",
                    "Little Red - Help! Huntsman are you there?! I need help, there's a big bad wolf that's after me and I don't know where my Grandma is! Please help me!",
                ],
                next: "continueOutsidePart3",
                choices: null,
            },

              continueOutsidePart3: {
                //add picture of door open with Huntsman
                bg: doorOpenHuntsmanImg, 
                lines: [
                    "After a few seconds pass, the door opens to to find a large man looking down at the little girl.",
                    "Huntsman - Little Red is that you? I'll help you, quickly, come inside while I get my weapons.",
                    "Little Red - Thank you so much!",
                
                ],
                next: "continueOutsidePart4",
                choices: null,
            },

              continueOutsidePart4: {
                //add picture of living room Huntsman
                bg: livingRoomImg, 
                lines: [
                     "Little Red heads inside the Huntsman's cabin and waits in the living room as he prepares to take down the wolf, grabbing his marksman and other weapons.",
                ],
                next: "continueOutsidePart5",
                choices: null,
            },

            continueOutsidePart5: {
                //add picture of the creepy forest
                bg: creepyForestTwoImg, 
                lines: [
                    "Outside in the forest are the Huntsman and Little Red as they head back to Grandma's cabin. They find the big bad wolf along the path growling at them as the wolf and the Huntsman have their stand off with Little Red hiding behind the Huntsman. ",

                    "Huntsman - There you are you wicked wolf!",
                  
                    "The Big Bad Wolf - I'll eat you too if I have to! Get away from the little girl she's mine!",

                    "As they both stare at each other intensely in their standoff, suddenly the wolf makes a breaks for it barreling his way towards the Huntsman. The Huntsman quickly equips his fully loaded marksman gun and points it towards the wolf and clicks the trigger and then.",

                ],
                  next: "continueOutsidePart6",
                choices: null,
            },


 continueOutsidePart6: {
                
                bg: gunImg, 
                lines: [
                     "BOOM",
                ],
                next: "continueOutsidePart7",
                choices: null,
            },


             continueOutsidePart7: {
                
                bg: creepyForestTwoImg, 
                lines: [
                     "The air around the forest goes silent as a single shot rings out in the forest. Causing the birds and animals to flee from the sudden noise. ",
                     "As the smoke clears from the gun, the Huntsman and Little Red see the collapsed wolf on the ground with a pool of blood slowly emerging from under his head.",
                     "The Huntsman has won the battle! ",
                     "The Huntsman and Little Red rejoice in excitement! As they now put their focus on finding Grandma.",
                ],
                next: "continueOutsidePart8",
                choices: null,
            },


             continueOutsidePart8: {
                //Change image to grandma's house cabin
                bg: cabinImg, 
                lines: [
                     "They head over to Grandma's cabin to search for her.",
                ],
                //Switch to the finale
                routeFour: "/finale",
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

    // if node ends in routeFour, go there
    if (node.routeFour) {
        navigate(node.routeFour);
        return;
    }

    // if node has "next", advance
    if (!node.choices && node.next) {
        if (nodeId === "continueOutsidePart5" && node.next === "continueOutsidePart6") {
            playGunShot();
        }
        
        setNodeId(node.next);
        setLineIndex(0);
    }


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

export default Outside;
