import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import beginScreen from './assets/The Little.png';
import './styles/App.css';

import Progression from "./Progression.jsx";
import { updateProgress } from "./gameState";
//How to import image
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'

//import all of the other pages
// import './App.css'


const App = () => {

  const navigate = useNavigate();
  useEffect(() => {
    updateProgress("Title");
  }, []);

  //Change it to go to the forest instead!
  const handleGoToForest = () => {
    navigate('/forest');
  };

  const handleRedirect = () => {
    window.location.href = "https://docs.google.com/document/d/1skfH5kdxccAboejNMXq7KPyU7CVvoh-MyYZVQGw-9Lw/edit?usp=sharing";
  };

  //   //Change it to go to the credits
  // const handleGoToCredits = () => {
  //   navigate('/credit');
  // };
  
  return (
    <>
    {/* <Progression /> */}
    <div id="gameScreen">
    <img src={beginScreen} id="logo" alt="" /></div>
    <div className="btnContainer2">
    <button type="button" id="beginButton" onClick={handleGoToForest}> Begin</button> 
    <button id="creditBtn" onClick={handleRedirect}>Credits</button></div>
    <footer><p id="credit">Made by Jayla Craddock in April 2026 for ITSE 2371-001 Front-End Frameworks </p></footer></>
  );

};

export default App;
