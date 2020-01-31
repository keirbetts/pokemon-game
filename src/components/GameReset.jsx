import React from "react";

const ResetGame = props => {
  const handleOnSubmit = event => {
    // event.preventDefault();
    props.resetGame();
    // this triggers a new pokemon to be selected
    // reset lose messages and lives back to 0
  };

  return (
    <section onSubmit={handleOnSubmit} className="reset-section">
      <form className="reset-form">
        <label>{props.answer === true ? "Play Again" : "Reset"}</label>
        <button className="reset-btn">
          {props.answer === true ? "Play Again" : "Reset"}
        </button>
      </form>
    </section>
  );
};

export default ResetGame;
