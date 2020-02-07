import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Pokemoncard from "./components/Pokemoncards";
import PokemonDetail from "./components/PokemonDetail";
import sound from "./sounds/whos-that-pokemon.mp3";
import themeMusic from "./sounds/opening.mp3";
import victory from "./sounds/victory.mp3";

class App extends React.Component {
  state = {
    pokemon: [],
    randPokemon: {},
    answer: false,
    guesses: 3,
    id: 0,
    mainTheme: {
      playing: true,
      pause: false
    },
    victory: {
      playing: false,
      pause: false
    }
  };

  // sound
  openingSound = new Audio(sound);
  themeMusic = new Audio(themeMusic);
  victory = new Audio(victory);

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

        //set id
        const randomId = this.getRandomId();
        console.log(randomId, "RANDOMID");

        this.setState(
          () => {
            return {
              pokemon: setPokemon,
              randPokemon: setRandomPokemon,
              id: randomId
            };
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

  getRandomId = () => {
    let count = 12;
    let keys = [];
    for (let i = count; i >= 0; i--) {
      keys.push(Math.floor(Math.random() * 9));
    }

    return parseInt(keys.join(""));
  };

  setMusic = () => {
    if (this.state.guesses === 3 && this.state.answer === false) {
      this.openingSound.play();
      // setTimeout(() => {
      //   this.themeMusic.play();
      // }, 4000);
    } else {
      this.openingSound.pause();
    }

    if (this.state.answer === true) {
      this.themeMusic.pause();
      this.victory.play();
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
      <Router>
        <div>
          {this.setMusic(this.openingSound, "play")}

          <Switch>
            <Route path="/" exact>
              <Pokemoncard
                randomPokemon={this.state.randPokemon}
                checkGuess={this.checkGuess}
                answer={this.state.answer}
                resetGame={this.resetGame}
                id={this.state.id}
                setMusic={this.setMusic}
                guesses={this.state.guesses}
              />
            </Route>
            <Route path="/pokemon/:id">
              <PokemonDetail pokemon={this.state.randPokemon} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
