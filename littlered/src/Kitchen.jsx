

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Decorations.css";
import RestartButton from "./RestartButton.jsx";
import Progression from "./Progression.jsx";
import { useEffect } from "react";
import { updateProgress } from "./gameState.js";


//Images
import forestTwoImg from "./assets/forest3.png";
import kitchenImg from "./assets/kitchen.jpg";
import forestImg from "./assets/forest2.png";

import doorClosedImg from "./assets/doorClosed.png";
import bedroomImg from "./assets/bedroom.jpg";
import bathroomImg from "./assets/bathroom.png";
import livingImg from "./assets/inside_cabin.png";
import blackImg from "./assets/black.png";



const Kitchen = () => {
    const navigate = useNavigate();
     useEffect(() => {
            updateProgress("Kitchen");
        }, []);
    const story = useMemo (
        () => ({
            start: {
                bg: kitchenImg,
                lines: [
                    "After Little Red and her Grandmother enjoyed their festivities it was now the late afternoon.",
                    "They decide that it's time for dinner and today they'll be having vegetable soup.",
                    "Grandmother - Deary do you think you can go and get some logs in the backyard in preparation for the Cauldron?",
                    "Little Red - Yes Grandma I'll go and do that",
                    
                ],
                next: "continueKitchenPart1",
                choices: null,
            },

              continueKitchenPart1: {
                //change this image to door closed
                bg: doorClosedImg,
                lines: ["While Little Red is in the backyard collecting logs for the Cauldron and her Grandmother is prepping the kitchen she hears a knock on her door.",
                    "Grandmother - Who could be here at this hour?",
                

                ],
                next: "continueKitchenPart2",
                choices: null,
            
            },

            continueKitchenPart2: {
                //change this image to different forest img
                bg: forestTwoImg,
                lines: [
                   "Grandmother goes to open the door to find no one there. ",
                    "She then proceeds to go outside to take a closer look ",
                ],
                next: "continueKitchenPart3",
                choices: null,
            
            },


            continueKitchenPart3: {
                //change this image to black
                bg: blackImg,
                lines: [
                   "when she is suddenly struck on the head with a unknown blunt object from a mysterious figure.",
              "Grandmother looses conciseness and falls to the ground. The unknown figure proceeds to pick up Grandma and take her inside the Cabin, where the figure goes around to some rooms to find a place to hide Grandma.",
                ],
                next: "continueKitchenPart4",
                choices: null,
            
            },
            continueKitchenPart4: {
                //change this image to bedroom
                bg: bedroomImg,
                lines: ["The Figure finds Grandmother's bedroom and finds a closet that fits Grandma in there perfectly.",
                    "As The Figure is stuffing Grandma into the closet they hear someone yelling coming from the Kitchen. ",
                    "Little Red - Grandma! I was finally able to get the logs! Sorry that it took me so long they were pretty heavy to carry all the way here. Where are you?",
                    "The Figure proceeds to panic as they don't want to be caught.",
                    "They proceed to think of a way to escape from whoever is in the kitchen.",
                    "When they have an idea to pretend to be Grandma.",
                    "They find a perfect disguise by going through the closet that the unconscious Grandma is currently in and takes a copy of clothes that she is wearing. Putting on large thick framed Glasses, House slippers and a large, floral and baggy dress to wear.",
                    "After applying a little bit of makeup, the mysterious figure proceed to tuck themselves into bed as they await for the person in the kitchen.",
        

                ],
                next: "continueKitchenPart5",
                choices: null,
            
            },

            // Continue and show different pictures for this part
            continueKitchenPart5: {
                //add picture of kitchen
                bg: kitchenImg, 
                lines: [
                    "Back to the Kitchen where Little Red is currently looking for her Grandmother after collecting logs to fuel the Cauldron. She looks in several rooms: ",
                ],
                next: "continueKitchenPart6",
                choices: null,
            },

              continueKitchenPart6: {
                //add picture of living
                bg: livingImg, 
                lines: [
                    "The Living Room,",
                ],
                next: "continueKitchenPart7",
                choices: null,
            },

              continueKitchenPart7: {
                //add picture of bathroom
                bg: bathroomImg, 
                lines: [
                    "The Bathroom ",
                ],
                next: "continueKitchenPart8",
                choices: null,
            },

            continueKitchenPart8: {
                //add picture of bedroom
                bg: bedroomImg, 
                lines: [
                    "and lastly, Grandma's Bedroom ",
                    "Little Red enters her Grandmother's bedroom when she finally finds Grandma!",
                    "Little Red - Grandma! I was looking everywhere for you! Are you doing okay?",
                    "The Mysterious Figure speaking in a exaggerated Grandma voice says - ",
                    "'Grandma' - My Child, I'm so sorry I didn't announce my presence, you see, I must've caught something while I was outside. As I don't feel too well to even stand.",
                    "Little Red responds back in panic with: ",
                    "Little Red - Oh no! What do you think you have Grandma?",
                    "'Grandma' - I may have caught...an illness, a cold most likely.",
                    "As Little Red is listening to her Grandma she starts to notice something about Grandma's...odd features.",
                    "Little Red - Oh my Grandma, what big arms you have!",
                    "'Grandma' - They're for hugging you, my child.",
                    "Little Red - Grandma, what big legs you have!",
                    "'Grandma' - They're for making me run faster, my child.",
                    "Little Red - Oh my Grandma, what big ears you have!",
                    "'Grandma' - They're for hearing you better, my child.",
                    "Little Red - Grandma, what big eyes you have!",
                    "'Grandma' - They're for seeing you better, my child.",
                     "Little Red - Grandma, what big teeth you have!",
                    "'Grandma' - The better to eat you with!",
                    "After saying those words 'Grandma' takes off her disguise and it's the BIG BAD WOLF! ",
                    "The Wolf lunges himself onto Little Red to eat her.",
                    "But, fortunately Little Red dives just on time to avoid the wolf's attack.",
                    "As the two lay on the ground Little Red gets up and takes off to the front door of the cabin to escape the wicked wolf",
                    "While, the wolf struggles to gain his balance to chase after the little girl.",



                ],
                routeThree: "/outside",
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

    // if node ends in routeThree, go there
    if (node.routeThree) {
        navigate(node.routeThree);
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

export default Kitchen;
