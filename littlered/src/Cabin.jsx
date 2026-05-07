import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import cabinImg from "./assets/cabin.png";
import "./styles/Decorations.css";
import RestartButton from "./RestartButton.jsx";
import doorClosedImg from "./assets/doorClosed.png";
import doorOpenedImg from "./assets/doorOpened.png";

import Progression from "./Progression.jsx";
import { updateProgress } from "./gameState.js";


// function randomPick(array) {
//     return array[Math.floor(Math.random() * array.length)];

// }

const Cabin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        updateProgress("Cabin");
    }, []);

   const storyCont = useMemo (
       () => ({
           start: {
               bg: doorClosedImg,
               lines: [
                   "Little red arrives at Grandma's cabin door and knocks on it",
                   "She waits patiently but, doesn't hear a sound.",
                   "NOTE: From this point on in the story how the dialogue works in this game is that whenever you see something like 'Grandmother -' means that's the character talking.",
               ],
               next: "pathChoiceTwo",
               choices: null,
           },


           // Presented with choices that the player can pick
           pathChoiceTwo: {
               bg: doorClosedImg,
               lines: ["Should little red knock again or find a different way into Grandma's cabin?",


               ],
               choices: [
               { text: "Knock again", to: "goodResultTwo" },
               { text: "Find a different way into Grandma's Cabin", to: "badResultTwo"},
               ],
           },


           // Good path
           goodResultTwo: {
               bg: doorClosedImg,
               lines: [
                    "Little Red knocks on Grandma's door again and this time hears someone moving inside!",
               ],
         
               choices: [ {text: "*Door Opens*", to: "doorOpened"}],
           },

           doorOpened: {
            bg: doorOpenedImg,
            lines: [  "Grandma opens the door and speaks in a sweet voice",
                   "Grandma - My dearest child how are you? I'm so sorry it took me a minute to get to the door.",
                   "Little Red greets grandma back in kind with: ",
                   "Little Red - Hello Grandma it's nice to meet you! It's fine, I'm just glad to finally see you! ",
                   "Grandma - Well come inside my child we have so much to do!"],

                   toRoute:"/living",
                   choices: null,
           },

           //Bad path
           badResultTwo: {
               bg: cabinImg,
               lines: [
                   "Little Red goes to the side of the cabin to find another way into Grandma's cabin.",
                   "As Little Red goes to the back of the cabin to find a backdoor entrance, she slips and falls into a nearby river bank.",
                   "The strong currents swept away Little Red to be never be seen again.",
                   "The End. Ending 2 - Patience is Key"
               ],
               toRoute: "/ending",
               choices: null,
           },


          




       }),
       []
   );


const [nodeId, setNodeId] = useState("start");
const [lineIndex, setLineIndex] = useState(0);


const node = storyCont[nodeId];
const lines = node.lines;
const isLastLine = lineIndex >= lines.length - 1;
const showChoices = isLastLine && Array.isArray(node.choices) && node.choices.length > 0;


const goNext = () => {
   if (!isLastLine) {
       setLineIndex((i) => i + 1);
       return;
   }


   // if node ends in routeTo, go there
   if (node.toRoute) {
       navigate(node.toRoute);
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



export default Cabin;
