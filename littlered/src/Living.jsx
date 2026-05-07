
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import cabinImg from "./assets/cabin.png";
import "./styles/Decorations.css";
import RestartButton from "./RestartButton.jsx";

import livingImg from "./assets/inside_cabin.png";

//talk images
import parentsImg from "./assets/parents.png";
import childhoodImg from "./assets/childhood.png";
import weatherImg from "./assets/weather.png";

//cooking
import pieImg from "./assets/pie.png";
import sandwichImg from "./assets/sandwich.png";
import cookieImg from "./assets/cookie.png";

//board games
import chessImg from "./assets/chess.png";
import checkersImg from "./assets/checkers.png";
import ticTacToeImg from "./assets/tic_tac_toe.png";

//gambling games
import pokerImg from "./assets/poker.png";
import spadeImg from "./assets/spade.png";

//books
import goldilocksImg from "./assets/goldilocks.png";
import theBoyImg from "./assets/the_boy_who_cried_wolf.png";
import jackImg from "./assets/jack_and_the_beanstalk.png";
import theTortoiseImg from "./assets/the_tortoise_and_the_hare.png";

//arts and crafts
import paintingImg from "./assets/painting.png";
import drawingImg from "./assets/drawing.png";
import potteryImg from "./assets/pottery.png";

//animals
import birdsImg from "./assets/birds.png";
import deersImg from "./assets/deers.png";
import fishImg from "./assets/fish.png";

//chores
import broomImg from "./assets/broom.png";
import dishesImg from "./assets/dishes.png";



import Progression from "./Progression.jsx";
import { updateProgress } from "./gameState.js";

//For 3 outcomes 
function roll1to3() {
  return Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
}

//For 2 outcomes
function roll1to2() {
  return Math.floor(Math.random() * 2) + 1;
}

//For 4 outcomes
function roll1to4() {
  return Math.floor(Math.random() * 4) + 1;
}

const Living = () => {
  const navigate = useNavigate();

  useEffect(() => {
    updateProgress("Living");
  }, []);


  const [randomState, setRandomState] = useState({
    talkRoll: null,
   
    foodRoll: null, // 1 | 2 | 3
   
    gameRoll: null,
  
    gambleRoll: null,
  
    readRoll: null,
   
    craftRoll: null,
   
    creatureRoll: null,
  
    workRoll: null,
   

  });

  const nodes = useMemo(
    () => ({
      start: {
        bg: livingImg,
        lines: [
          "While at Grandma's house, Little Red Riding Hood chats with her Grandmother about life living in the forest.",
                   "Little Red and Grandma decide that they want to do something-",
        ],
        next: "pathChoiceThree",
        choices: null,
      },

      pathChoiceThree: {
        bg: livingImg,
        lines: ["What should they do? ",
          " In order to help Little Red decide on what they want to do, her Grandmother decides to play a guessing game, where Little Red picks a card with an image on it and whatever she picks will have a random outcome of what they do from that card.",
          "The random outcomes come from her Grandmother asking Little Red to pick a number from either 1-2, 1-3 or 1-4",
          "Little Red doesn't know this but, the range of the numbers have varying success rates with 1-2: 1 being the best and 2 being the worst.",
          "While for outcomes with 1-3: 1 being the best, 2 being fine but not the best while 3 is the worst.",
          "For 1-4 outcomes mean 1 being the best, 2 being fine but not the worse, 3 and 4 being the worst.",
          "Grandma - Here are the cards:",
        ],
        choices: [
          { text: "Chat Bubble Card", action: "chat" },
           { text: "Food Card", action: "eat" },
            { text: "Board Games Card", action: "board" },
             { text: "Gambling Games Card", action: "gambling" },

              { text: "Book Card", action: "book" },
               { text: "Art Card", action: "art" },
                { text: "Animal Card", action: "animal" },
                 { text: "Chores Card", action: "chore" },

          { text: "Decline the game", action: "backAway" },
        ],
      },





      // Food branches (each has different bg + text)
      //Say something to let the user know of success and failure that you
      // have to choose carefully 

       chatParent: {
        bg: parentsImg,
        lines: [
          "Little Red picks the chat card and picks a number from 1-3",
          "__TALK_ROLL__",
          "Grandmother - Great! Let's talk about her life back at home Little Red.",
        ],
        choices: [{ text: "Continue", routeToo: "/kitchen" }],
      },

      chatChildhood: {
        bg: childhoodImg,
        lines: [
          "Little Red picks the chat card and picks a number from 1-3",
          "__TALK_ROLL__",
          "Grandmother - Not bad! Let's talk about my Childhood!",
        ],
        choices: [{ text: "Continue", routeToo: "/kitchen" }],
      },

      chatWeather: {
        bg: weatherImg,
    
        lines: [
        "Little Red picks the chat card and picks a number from 1-3",
          "__TALK_ROLL__",
          "Grandmother - Aww, that means we're going to talk about the weather, but that's so boring! Lets try that again",
        ],
        next: "gameOver",
        choices: null,
      },


      //FOOD CARD CHOICES
      eatApple: {
        bg: pieImg,
        lines: [
          "Little Red picks the food card and picks a number from 1-3",
          "__FOOD_ROLL__",
          "Grandmother - Great! We're going to bake an Apple Pie!",
        ],
        choices: [{ text: "Continue", routeToo: "/kitchen" }],
      },

      eatSandwich: {
        bg: sandwichImg,
        lines: [
          "Little Red picks the food card and picks a number from 1-3",
          "__FOOD_ROLL__",
          "Grandmother - Not bad! We're going to make some sandwiches!",
        ],
        choices: [{ text: "Continue", routeToo: "/kitchen" }],
      },

      eatChocolate: {
        bg: cookieImg,
    
        lines: [
        "Little Red picks the food card and picks a number from 1-3",
          "__FOOD_ROLL__",
          "Grandmother - Aww, that means we can bake some chocolate chip cookies",
          "Little Red and her Grandmother bake some Chocolate chip cookies but, they end up being burned. Lets try that again",
        ],
        next: "gameOver",
        choices: null,
      },

      //BOARD
            boardChess: {
        bg: chessImg,
        lines: [
          "Little Red picks the board card and picks a number from 1-3",
          "__GAME_ROLL__",
          "Grandmother - Great! Let's play chess!",
        ],
        choices: [{ text: "Continue", routeToo: "/kitchen" }],
      },

      boardCheckers: {
        bg: checkersImg,
        lines: [
          "Little Red picks the board card and picks a number from 1-3",
          "__GAME_ROLL__",
          "Grandmother - Not bad! Let's play checkers!",
        ],
        choices: [{ text: "Continue", routeToo: "/kitchen" }],
      },

      boardTic: {
        bg: ticTacToeImg,
    
        lines: [
        "Little Red picks the board card and picks a number from 1-3",
          "__GAME_ROLL__",
          "Grandmother - Aww, that means we're going to play tic-tac-toe.",
      "Little Red plays tic-tac-toe with her Grandmother but, it turns out to be such a boring activity! Lets try that again",
        ],
        next: "gameOver",
        choices: null,
      },

      //GAMBLING
                  gamblingPoker: {
        bg: pokerImg,
        lines: [
          "Little Red picks the gambling card and picks a number from 1-2",
          "__GAMBLE_ROLL__",
          "Grandmother - Great! Let's play Poker!",
        ],
        choices: [{ text: "Continue", routeToo: "/kitchen" }],
      },

      gamblingSpades: {
        bg: spadeImg,
    
        lines: [
        "Little Red picks the gambling card and picks a number from 1-2",
          "__GAMBLE_ROLL__",
          "Grandmother - Aww, that means we're going to play Spades.",
      "Little Red plays Spades with her Grandmother but, it turns out to be such a boring activity! Lets try that again",
        ],
        next: "gameOver",
        choices: null,
      },



      //BOOK
                  bookBear: {
        bg: goldilocksImg,
        lines: [
          "Little Red picks the book card and picks a number from 1-4",
          "__READ_ROLL__",
          "Grandmother - Great! Let's read Goldilocks and The 3 Bears!",
        ],
        choices: [{ text: "Continue", routeToo: "/kitchen" }],
      },

      bookBoy: {
        bg: theBoyImg,
        lines: [
          "Little Red picks the book card and picks a number from 1-4",
          "__READ_ROLL__",
          "Grandmother - Not bad! Let's read The Boy who Cried Wolf!",
        ],
        choices: [{ text: "Continue", routeToo: "/kitchen" }],
      },

      bookBean: {
        bg: jackImg,
    
        lines: [
        "Little Red picks the book card and picks a number from 1-4",
          "__READ_ROLL__",
          "Grandmother - Aww, that means we're going to read Jack and the Giant Beanstalk.",
      "Little Red reads Jack and the Giant Beanstalk with her Grandmother but, it turns out to be such a boring activity! Lets try that again",
        ],
        next: "gameOver",
        choices: null,
      },

        bookHare: {
        bg: theTortoiseImg,
    
        lines: [
        "Little Red picks the book card and picks a number from 1-4",
          "__READ_ROLL__",
          "Grandmother - Aww, that means we're going to read The Tortoise and The Hare.",
      "Little Red reads The Tortoise and The Hare with her Grandmother but, it turns out to be such a boring activity! Lets try that again",
        ],
        next: "gameOver",
        choices: null,
      },


      //ART
                  artPaint: {
        bg: paintingImg,
        lines: [
          "Little Red picks the art card and picks a number from 1-3",
          "__CRAFT_ROLL__",
          "Grandmother - Great! Let's paint!",
        ],
        choices: [{ text: "Continue", routeToo: "/kitchen" }],
      },

      artDraw: {
        bg: drawingImg,
        lines: [
          "Little Red picks the art card and picks a number from 1-3",
          "__CRAFT_ROLL__",
          "Grandmother - Not bad! Let's draw!",
        ],
        choices: [{ text: "Continue", routeToo: "/kitchen" }],
      },

      artPottery: {
        bg: potteryImg,
    
        lines: [
        "Little Red picks the art card and picks a number from 1-3",
          "__CRAFT_ROLL__",
          "Grandmother - Aww, that means we're going to do pottery.",
      "Little Red does pottery with her Grandmother but, it turns out to be such a boring activity! Lets try that again",
        ],
        next: "gameOver",
        choices: null,
      },
       

         //ANIMAL
                  animalBird: {
        bg: birdsImg,
        lines: [
          "Little Red picks the animal card and picks a number from 1-2",
          "__CREATURE_ROLL__",
          "Grandmother - Great! Let's feed birds!",
        ],
        choices: [{ text: "Continue", routeToo: "/kitchen" }],
      },

      animalDeer: {
        bg: deersImg,
    
        lines: [
        "Little Red picks the animal card and picks a number from 1-2",
          "__CREATURE_ROLL__",
          "Grandmother - Aww, that means we're going to feed deers.",
      "Little Red goes outside to feed deers with her Grandmother but, it turns out to be such a boring activity! Lets try that again",
        ],
        next: "gameOver",
        choices: null,
      },

      //CHORES
                  choreDish: {
        bg: dishesImg,
        lines: [
          "Little Red picks the chore card and picks a number from 1-2",
          "__WORK_ROLL__",
          "Grandmother - Great! Let's wash dishes!",
        ],
        choices: [{text: "Continue", routeToo: "/kitchen" }],
      },

      choreSweep: {
        bg: broomImg,
    
        lines: [
        "Little Red picks the chore card and picks a number from 1-2",
          "__WORK_ROLL__",
          "Grandmother - Aww, that means we're going to sweep the floors.",
      "Little Red sweeps the floors with her Grandmother but, it turns out to be such a boring activity! Lets try that again",
        ],
        next: "gameOver",
        choices: null,
      },


      gameOver: {
        bg: cabinImg,
        lines: ['Ending 3: Reroll'],
        choices: [{ text: "Continue", routeToo: "/endings" }],
      },

      backAwayResult: {
        bg: fishImg,
        lines: [
          "Little Red - Thanks Grandma but, I think I'm going to skip the game for now.",
          "Little Red - I decide that I want to fishing!"
        ],
        choices: [{ text: "Continue", routeToo: "/kitchen" }],
      },
    }),
    []
  );

  const [nodeId, setNodeId] = useState("start");
  const [lineIndex, setLineIndex] = useState(0);

  const node = nodes[nodeId];
  const isLastLine = lineIndex >= node.lines.length - 1;
  const showChoices =
    isLastLine && Array.isArray(node.choices) && node.choices.length > 0;

  const goNext = () => {
    if (!isLastLine) {
      setLineIndex((i) => i + 1);
      return;
    }
    if (!node.choices && node.next) {
      setNodeId(node.next);
      setLineIndex(0);
    }
  };


//CHAT
  const doAction = (action) => {
    
    //CHAT
    if (action === "chat") {
      const roll = roll1to3();

      // Map roll -> choice + node
      if (roll === 1) {
        setRandomState((prev) => ({ ...prev, talkRoll: roll }));
        setNodeId("chatParent");
      } else if (roll === 2) {
        setRandomState(({ talkRoll: roll }));
        setNodeId("chatChildhood");
      } else {
        setRandomState( ({ talkRoll: roll }));
        setNodeId("chatWeather");
      }

      setLineIndex(0);
      return;
    }

      //EAT
       if (action === "eat") {
      const roll = roll1to3();

      // Map roll -> choice + node
      if (roll === 1) {
        setRandomState((prev) => ({ ...prev, foodRoll: roll }));
        setNodeId("eatApple");
      } else if (roll === 2) {
        setRandomState(({ foodRoll: roll }));
        setNodeId("eatSandwich");
      } else {
        setRandomState( ({ foodRoll: roll }));
        setNodeId("eatChocolate");
      }

        setLineIndex(0);
      return;
    }

          //BOARD
       if (action === "board") {
      const roll = roll1to3();

      // Map roll -> choice + node
      if (roll === 1) {
        setRandomState((prev) => ({ ...prev, gameRoll: roll }));
        setNodeId("boardChess");
      } else if (roll === 2) {
        setRandomState(({ gameRoll: roll }));
        setNodeId("boardCheckers");
      } else {
        setRandomState( ({ gameRoll: roll }));
        setNodeId("boardTic");
      }

        setLineIndex(0);
      return;
    }

          //GAMBLING
       if (action === "gambling") {
      const roll = roll1to2();

      // Map roll -> choice + node
      if (roll === 1) {
        setRandomState((prev) => ({ ...prev, gambleRoll: roll }));
        setNodeId("gamblingPoker");
      } else if (roll === 2) {
        setRandomState(({ gambleRoll: roll }));
        setNodeId("gamblingSpades");
      } 

        setLineIndex(0);
      return;
    }

          //BOOK
       if (action === "book") {
      const roll = roll1to4();

      // Map roll -> choice + node
      if (roll === 1) {
        setRandomState((prev) => ({ ...prev, readRoll: roll }));
        setNodeId("bookBear");
      } else if (roll === 2) {
        setRandomState(({ readRoll: roll }));
        setNodeId("bookBoy");
      } else if (roll === 3) {
        setRandomState(({ readRoll: roll }));
        setNodeId("bookBean");
      } else {
        setRandomState( ({ readRoll: roll }));
        setNodeId("bookHare");
      }

        setLineIndex(0);
      return;
    }

      //ART
       if (action === "art") {
      const roll = roll1to3();

      // Map roll -> choice + node
      if (roll === 1) {
        setRandomState((prev) => ({ ...prev, craftRoll: roll }));
        setNodeId("artPaint");
      } else if (roll === 2) {
        setRandomState(({ craftRoll: roll }));
        setNodeId("artDraw");
      } else {
        setRandomState( ({ craftRoll: roll }));
        setNodeId("artPottery");
      }

        setLineIndex(0);
      return;
    }


        //ANIMAL
       if (action === "animal") {
      const roll = roll1to2();

      // Map roll -> choice + node
      if (roll === 1) {
        setRandomState((prev) => ({ ...prev, creatureRoll: roll }));
        setNodeId("animalBird");
      } else if (roll === 2) {
        setRandomState(({ creatureRoll: roll }));
        setNodeId("animalDeer");
      } 

        setLineIndex(0);
      return;
    }

          //CHORES
       if (action === "chore") {
      const roll = roll1to2();

      // Map roll -> choice + node
      if (roll === 1) {
        setRandomState((prev) => ({ ...prev, workRoll: roll }));
        setNodeId("choreDish");
      } else if (roll === 2) {
        setRandomState(({ workRoll: roll }));
        setNodeId("choreSweep");
      }

      setLineIndex(0);
      return;
    }
  

    if (action === "backAway") {
      setNodeId("backAwayResult");
      setLineIndex(0);
      return;
    }
  };

  const pickChoice = (choice) => {
    if (choice.routeToo) {
      navigate(choice.routeToo);
      return;
    }
    if (choice.action) {
      doAction(choice.action);
    }
  };

  //Change it to say Little Red picks this and that
  const currentLineRaw = node.lines[lineIndex];
  const currentLine =
  
  currentLineRaw === "__TALK_ROLL__"
      ? `Little Red picks number: ${randomState.talkRoll ?? "?"}`


    : currentLineRaw === "__FOOD_ROLL__"
      ? `Little Red picks number: ${randomState.foodRoll ?? "?"}`
    
      
    : currentLineRaw === "__GAME_ROLL__"
    ? `Little Red picks number: ${randomState.gameRoll ?? "?"}`
    

    : currentLineRaw === "__GAMBLE_ROLL__"
    ? `Little Red picks number: ${randomState.gambleRoll ?? "?"}`

    : currentLineRaw === "__READ_ROLL__"
    ? `Little Red picks number: ${randomState.readRoll ?? "?"}`

    : currentLineRaw === "__CRAFT_ROLL__"
    ? `Little Red picks number: ${randomState.craftRoll ?? "?"}`

    : currentLineRaw === "__CREATURE_ROLL__"
    ? `Little Red picks number: ${randomState.creatureRoll ?? "?"}`

    : currentLineRaw === "__WORK_ROLL__"
    ? `Little Red picks number: ${randomState.workRoll ?? "?"}`
    : currentLineRaw;

  return (
    <div className="scene">
      <img src={node.bg} className="sceneBG" alt="Kitchen background" />

      <div className="btnContainer">
              <Progression /> 
              <RestartButton />
      </div>

      <div className="textbox">
        <p className="textboxText">{currentLine}</p>

        <div className="textboxControls">
          {!showChoices ? (
            <button className="btn" type="button" onClick={goNext}>
              {isLastLine ? "Continue" : "Next"}
            </button>
          ) : (
            <div className="choices">
              {node.choices.map((c, idx) => (
                <button
                  key={idx}
                  className="btn btnChoice"
                  type="button"
                  onClick={() => pickChoice(c)}
                >
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

export default Living;