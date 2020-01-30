import React from "react";

class Pokemoncard extends React.Component {
  state = {
    guess: ""
  };

  handleSubmit = () => {};
  handleChange = changeEvent => {
    let userGuess = changeEvent.target.value;
    this.setState(
      () => {
        return { guess: userGuess };
      },
      () => {
        console.log(this.state);
      }
    );
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Guess:{" "}
          <input type="text" name="pokemon" onChange={this.handleChange} />
        </label>
        <button>Guess!</button>
      </form>
    );
  }
}

export default Pokemoncard;
