import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import Title from "./components/Title";
import Pokemoncard from "./components/Pokemoncards";

class App extends React.Component {
  state = {
    pokemon: [],
    randPokemon: {},
    answer: false,
    guesses: 3
  };

  componentDidMount() {
    console.log("mounting");
    fetch("https://pokeapi.co/api/v2/pokemon?limit=150", {
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        const fetchedPokemon = data.results;
        const pokemonIds = [];

        // generate pokemon ids
        fetchedPokemon.forEach((pokemon, idx) => {
          if (`${idx}`.length === 1) {
            pokemonIds.push(`00${idx}`);
          } else if (`${idx}`.length === 2) {
            pokemonIds.push(`0${idx}`);
          } else {
            pokemonIds.push(`${idx}`);
          }
        });

        // sort off by one error
        pokemonIds.shift();
        pokemonIds.push("150");

        fetchedPokemon.forEach((pokemon, idx) => {
          pokemon.img = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonIds[idx]}.png`;
        });

        const setPokemon = [...fetchedPokemon];

        // set random pokemon
        const setRandomPokemon =
          setPokemon[Math.floor(Math.random() * 150) + 1];

        this.setState(
          () => {
            return { pokemon: setPokemon, randPokemon: setRandomPokemon };
          },
          () => {
            console.log(this.state, "CURRENT STATE");
          }
        );
      });
  }

  checkGuess = playerGuess => {
    if (playerGuess === this.state.randPokemon.name) {
      this.setState(
        currentState => {
          // console.log(currentState, "CURRENT");
          return {
            answer: !currentState.answer
          };
        },
        () => {
          console.log(this.state.guesses, "POST ANSWER");
        }
      );
    } else {
      this.setState(currentState => {
        return { guesses: currentState.guesses - 1 };
      });
    }
  };

  resetGame = () => {
    this.setState(currentState => {
      return {
        ...currentState,
        randomPokemon: currentState.pokemon[Math.floor(Math.random() * 150) + 1]
      };
    });
  };

  render() {
    return (
      <div>
        <Title guesses={this.state.guesses} />
        <Pokemoncard
          randomPokemon={this.state.randPokemon}
          checkGuess={this.checkGuess}
          answer={this.state.answer}
          resetGame={this.resetGame}
        />
      </div>
    );
  }
}

export default App;
