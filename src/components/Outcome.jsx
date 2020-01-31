import React from "react";
import GameReset from "./GameReset";

const Outcome = props => {
  console.log(props.answer, "OUTCOME");
  return props.answer === true ? (
    <div className="correct-answer">
      <GameReset answer={props.answer} />
      <header className="correct-pokemon-title">
        {props.randomPokemon.name.toUpperCase()}
      </header>
      <img
        src="https://www.freepngimg.com/thumb/pokemon/37717-4-pokemon-ash-image.png"
        alt="happy-ash"
      />
    </div>
  ) : (
    <div className="incorrect-answer-container">
      <GameReset answer={props.answer} />
      <img
        src="https://camo.githubusercontent.com/8dd9439d771cb25409831294fc728ac61c499b72/68747470733a2f2f692e696d6775722e636f6d2f583962314b75362e706e67"
        alt="who's that pokemon"
      />
    </div>
  );
};

export default Outcome;
