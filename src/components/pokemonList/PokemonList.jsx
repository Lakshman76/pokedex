import { useEffect, useState } from "react";
import "./PokemonList.css";
import axios from "axios";
import Pokemon from "../pokemon/Pokemon";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

  const [pokedexUrl, setPokedexUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [prevUrl, setPrevUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");

  async function downloadPokemons() {
    const response = await axios.get(pokedexUrl ? pokedexUrl : DEFAULT_URL);
    const pokemonResults = response.data.results;
    
    setPrevUrl(response.data.previous);
    setNextUrl(response.data.next);
    const pokemonPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );    
    const pokemonListData = await axios.all(pokemonPromise);
    const pokemonFinalList = pokemonListData.map((pokemonData) => {
      const pokemon = pokemonData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
    setPokemonList(pokemonFinalList);
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-list-header">Pokemon List</div>
      <div className="header-nav">
        <button onClick={() => setPokedexUrl(prevUrl)}>
          <HiOutlineChevronDoubleLeft /> prev
        </button>
        <button onClick={() => setPokedexUrl(nextUrl)}>
          next <HiOutlineChevronDoubleRight />
        </button>
      </div>
      <div className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <Pokemon key={pokemon.id} name={pokemon.name} url={pokemon.image} />
        ))}
      </div>
      <div className="footer-nav">
        <button onClick={() => setPokedexUrl(prevUrl)}>
          <HiOutlineChevronDoubleLeft /> prev
        </button>
        <button onClick={() => setPokedexUrl(nextUrl)}>
          next <HiOutlineChevronDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
