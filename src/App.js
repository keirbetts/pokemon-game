import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import Title from "./components/Title";
import Pokemoncard from "./components/Pokemoncards";

class App extends React.Component {
  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {
      pokemon: [],
      randPokemon: {}
    };
  }

  componentDidMount() {
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
            return { currentState: setPokemon, randPokemon: setRandomPokemon };
          },
          () => {
            console.log(this.state, "CURRENT STATE");
          }
        );
      });
  }

  checkGuess(playerGuess) {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <Title />
        <Pokemoncard
          randomPokemon={this.state.randPokemon}
          checkGuess={this.checkGuess.bind(this)}
        />
      </div>
    );
  }
}

export default App;
