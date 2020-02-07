import React from "react";
import reset from "../images/reset-icon.png";

const ResetGame = props => {
  const handleOnSubmit = event => {
    // event.preventDefault();
    props.resetGame();
    props.setMusic();
    // this triggers a new pokemon to be selected
    // reset lose messages and lives back to 0
  };

  return (
    <section onSubmit={handleOnSubmit} className="reset-section">
      <form className="reset-form">
        <p>{props.answer === true ? "Play Again?" : "Reset"}</p>
        <button className="reset-btn">
          <img src={reset} alt="reset-button" />
        </button>
      </form>
    </section>
  );
};

export default ResetGame;
