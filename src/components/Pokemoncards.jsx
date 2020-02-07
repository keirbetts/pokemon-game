import React from "react";
import { Link } from "react-router-dom";
import Outcome from "./Outcome";
import Title from "./Title";
import sadPika from "../images/sad-pika.png";
import submit from "../images/submit-icon.png";

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
        <header>
          <Title guesses={this.props.guesses} />
        </header>

        <form onSubmit={this.handleSubmit} className="guess-form">
          <label>
            Guess:
            <input
              type="text"
              name="pokemon"
              onChange={this.handleChange}
              placeholder="Your guess"
              className="guess-form-label"
            />
          </label>
          <button className="guess-btn">
            <img src={submit} />
          </button>
        </form>

        {/* {console.log(this.props.randomPokemon)} */}
        {/* {this.props.guesses <= 0 && (
          <section className="game-lose">you Lose, try again?</section>
        )} */}

        <div className="pokemon-img-container">
          {console.log(this.props, "PROPS")}
          {this.props.answer === true ? (
            <Link to={`/pokemon/${this.props.id}`}>
              {this.props.setMusic()}
              <img
                id="pokemon-correct"
                src={this.props.randomPokemon.img}
                alt={this.props.name}
              />
            </Link>
          ) : this.props.guesses > 0 ? (
            <img
              id="pokemon-incorrect"
              src={this.props.randomPokemon.img}
              alt={this.props.name}
            />
          ) : (
            <img className="sad-pika-img" src={sadPika} />
          )}
        </div>
        {console.log(this.props.answer, "FROM CARDS")}
        <Outcome
          answer={this.props.answer}
          randomPokemon={this.props.randomPokemon}
          resetGame={this.props.resetGame}
          setMusic={this.props.setMusic}
          guesses={this.props.guesses}
        />
      </section>
    );
  }
}

export default Pokemoncard;
