import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import Title from "./components/Title";
import Pokemoncard from "./components/Pokemoncards";

class App extends React.Component {
  state = {
    Pokemon: [
      {
        name: "Pikachu",
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
      },
      {
        name: "Bulbasaur",
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
      }
    ]
  };

  render() {
    return (
      <div>
        <Title />
        <Pokemoncard />
      </div>
    );
  }
}

export default App;
