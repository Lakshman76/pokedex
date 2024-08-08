import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import getAllPokemons from "../utils/getAllPokemons";

function usePokemon(id) {
  const POKEMON_DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    pokedexUrl: "",
    nextUrl: "",
    prevUrl: "",
  });

  async function getPokemonDetails(id) {
    const response = await axios.get(POKEMON_DEFAULT_URL + id);
    const pokemon = response.data;
    setPokemonDetails({
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types,
      image: pokemon.sprites.other.dream_world.front_default,
    });
    const types = pokemon.types.map((t) => t.type.name);
    return types[0];
  }

  async function getRelatedPokemon(id) {
    const type = await getPokemonDetails(id);
    getAllPokemons(
      pokemonListState,
      setPokemonListState,
      `https://pokeapi.co/api/v2/type/${type}`
    );
  }

  useEffect(() => {
    toast.promise(getRelatedPokemon(id), {
      loading: "Wait! Fetching details of Pokemon",
      success: "Successfully fetched details of Pokemon",
      error: "Failed to fetch Pokemon details",
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);
  return [pokemonDetails, pokemonListState];
}

export default usePokemon;
