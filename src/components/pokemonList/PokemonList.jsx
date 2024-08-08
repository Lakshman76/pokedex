import "./PokemonList.css";
import Pokemon from "../pokemon/Pokemon";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";
import usePokemonList from "../../hooks/usePokemonList";

const PokemonList = () => {
  const [pokemonListState, setPokemonListState] = usePokemonList();

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-list-header">Pokemon List</div>
      <div className="header-nav">
        <button
          onClick={() =>
            setPokemonListState({
              ...pokemonListState,
              pokedexUrl: pokemonListState.prevUrl,
            })
          }
        >
          <HiOutlineChevronDoubleLeft /> prev
        </button>
        <button
          onClick={() =>
            setPokemonListState({
              ...pokemonListState,
              pokedexUrl: pokemonListState.nextUrl,
            })
          }
        >
          next <HiOutlineChevronDoubleRight />
        </button>
      </div>
      <div className="pokemon-list">
        {pokemonListState.pokemonList.map((pokemon) => (
          <Pokemon
            key={pokemon.id}
            name={pokemon.name}
            url={pokemon.image}
            id={pokemon.id}
          />
        ))}
      </div>
      <div className="footer-nav">
        <button
          onClick={() =>
            setPokemonListState({
              ...pokemonListState,
              pokedexUrl: pokemonListState.prevUrl,
            })
          }
        >
          <HiOutlineChevronDoubleLeft /> prev
        </button>
        <button
          onClick={() =>
            setPokemonListState({
              ...pokemonListState,
              pokedexUrl: pokemonListState.nextUrl,
            })
          }
        >
          next <HiOutlineChevronDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
