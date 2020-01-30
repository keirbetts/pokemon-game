import React from "react";

class Pokemoncard extends React.Component {
  state = {
    guess: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    const playerGuess = this.state.guess;

    this.props.checkGuess(playerGuess);
  };

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
      <section>
        <form onSubmit={this.handleSubmit}>
          <label>
            Guess:{" "}
            <input type="text" name="pokemon" onChange={this.handleChange} />
          </label>
          <button>Guess!</button>
        </form>
        {/* {console.log(this.props.randomPokemon)} */}
        <img
          id="pokemon"
          src={this.props.randomPokemon.img}
          alt={this.props.name}
        />
      </section>
    );
  }
}

export default Pokemoncard;
