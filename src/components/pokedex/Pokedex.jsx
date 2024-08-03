import PokemonList from "../pokemonList/PokemonList";
import Search from "../search/Search";
import "./Pokedex.css";

const Pokedex = () => {
  return (
    <div className="pokedex-wrapper">
      <h1>POKEDEX</h1>
      <Search />
      <PokemonList />
    </div>
  );
};

export default Pokedex;
