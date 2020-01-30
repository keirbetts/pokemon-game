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
        {this.props.answer === true ? (
          <div className="correct-answer">
            <header className="correct-pokemon-title">
              {this.props.randomPokemon.name.toUpperCase()}
            </header>
            <img
              src="https://www.freepngimg.com/thumb/pokemon/37717-4-pokemon-ash-image.png"
              alt="happy-ash"
            />
          </div>
        ) : (
          <div className="incorrect-answer-container">
            <img
              src="https://camo.githubusercontent.com/8dd9439d771cb25409831294fc728ac61c499b72/68747470733a2f2f692e696d6775722e636f6d2f583962314b75362e706e67"
              alt="who's that pokemon"
            />
          </div>
        )}
      </section>
    );
  }
}

export default Pokemoncard;
