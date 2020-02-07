import React, { Component } from "react";
import axios from "axios";
import PokemonDetailTitle from "./PokemonDetailTitle";

class PokemonDetail extends Component {
  state = {
    pokemon: {
      name: "",
      descriptions: [],
      types: [],
      abilities: [],
      weight: 0,
      height: 0
    }
  };

  componentDidMount() {
    const pokeStatsPromise = axios.get(`${this.props.pokemon.url}`);
    const pokeDescription = axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${this.props.pokemon.name}`
    );

    Promise.all([pokeStatsPromise, pokeDescription]).then(
      ([
        { data },
        {
          data: { flavor_text_entries }
        }
      ]) => {
        // get en description version red of game
        const descriptionArr = flavor_text_entries
          .filter(entry => {
            return entry.language.name === "en";
          })
          .map(entry => {
            return entry.flavor_text;
          });

        // format types
        const formattedTypes = data.types.map(type => {
          return type.type.name;
        });

        //format abilities
        const formattedAbilities = data.abilities.map(ability => {
          return ability.ability.name;
        });

        // assemble data
        const pokemonData = {
          name: this.props.pokemon.name,
          descriptions: descriptionArr,
          types: formattedTypes,
          abilities: formattedAbilities,
          weight: parseFloat(data.weight / 10).toFixed(1),
          height: parseFloat(data.height / 10).toFixed(1)
        };

        // set state
        this.setState(
          currentState => {
            return { pokemon: { ...currentState.pokemon, ...pokemonData } };
          },
          () => {
            console.log(this.state, "DETAIL STATE");
          }
        );
      }
    );
  }

  render() {
    return (
      <section className="pokemon-detail-section">
        <header>
          <PokemonDetailTitle name={this.state.pokemon.name} />
        </header>

        {/* description */}
        <section className="pokemon-description-section">
          <p>
            {
              this.state.pokemon.descriptions[
                Math.floor(
                  Math.random() * this.state.pokemon.descriptions.length
                )
              ]
            }
          </p>
        </section>
        {/* pokemon img */}
        <div className="pokemon-detail-img-container">
          <img
            className="pokemon-detail-img"
            src={`${this.props.pokemon.img}`}
          />
        </div>
        {/* type- attributes */}
        <section className="type-list-container">
          <p>Weight: {this.state.pokemon.weight} kg</p>
          <p>Height: {this.state.pokemon.height} m</p>
          <h1>Types:</h1>
          <ul className="pokemon-detail-type-list">
            {this.state.pokemon.types.map((type, idx) => {
              return <li key={idx}>{type}</li>;
            })}
          </ul>
        </section>
        {/* abilities */}
        <section className="abilities-list-container">
          <h1>Abilities:</h1>
          <ul className="abilities-list">
            {this.state.pokemon.abilities.map((ability, idx) => {
              return <li key={idx}>{ability}</li>;
            })}
          </ul>
        </section>

        {/* <PokemonDetailStats pokemonStats={this.state.pokemon} /> */}
      </section>
    );
  }
}

export default PokemonDetail;
