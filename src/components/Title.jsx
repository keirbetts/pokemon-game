import React from "react";
import ball from "../images/ball.png";

const Title = props => {
  return (
    <nav className="main-nav">
      Pokémon life count:
      {console.log(props.guesses)}
      <img
        id={props.guesses === 0 ? "pokeball-greyed" : "pokeball1"}
        src={ball}
        alt="pokeball"
      />
      <img
        id={props.guesses <= 1 ? "pokeball-greyed" : "pokeball2"}
        src={ball}
        alt="pokeball"
      />
      <img
        id={props.guesses <= 2 ? "pokeball-greyed" : "pokeball3"}
        src={ball}
        alt="pokeball"
      />
    </nav>
  );
};

export default Title;
