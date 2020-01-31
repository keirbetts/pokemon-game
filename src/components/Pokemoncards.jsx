import React from "react";
import Outcome from "./Outcome";

class Pokemoncard extends React.Component {
  state = {
    guess: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    const playerGuess = this.state.guess;
    this.props.checkGuess(playerGuess, event);
  };

  handleChange = changeEvent => {
    let userGuess = changeEvent.target.value;
    this.setState(
      () => {
        return { guess: userGuess };
      },
      () => {
        // console.log(this.state);
      }
    );
  };
  render() {
    return (
      <section className="pokemon-main-container">
        <form onSubmit={this.handleSubmit}>
          <label>
            Guess:
            <input type="text" name="pokemon" onChange={this.handleChange} />
          </label>
          <button>Guess!</button>
        </form>
        {/* {console.log(this.props.randomPokemon)} */}

        <div className="pokemon-img-container">
          <img
            id={
              this.props.answer === true
                ? "pokemon-correct"
                : "pokemon-incorrect"
            }
            src={this.props.randomPokemon.img}
            alt={this.props.name}
          />
        </div>
        {console.log(this.props.answer, "FROM CARDS")}
        <Outcome
          answer={this.props.answer}
          randomPokemon={this.props.randomPokemon}
          resetGame={this.props.resetGame}
        />
      </section>
    );
  }
}

export default Pokemoncard;
