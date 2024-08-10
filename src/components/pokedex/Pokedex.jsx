import { useState } from "react";
import PokemonList from "../pokemonList/PokemonList";
import Search from "../search/Search";
import "./Pokedex.css";
import PokemonDetails from "../PokemonDetails/PokemonDetails";

const Pokedex = () => {
  const [searchItem, setSearchItem] = useState();
  return (
    <div className="pokedex-wrapper">
      <h1>POKEDEX</h1>
      <Search updateSearchItem={setSearchItem} />
      {searchItem ? (
        <PokemonDetails pokemonName={searchItem} />
      ) : (
        <PokemonList />
      )}
    </div>
  );
};

export default Pokedex;
