import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import getAllPokemons from "../utils/getAllPokemons";

function usePokemonList(DEFAULT_URL) {
  // const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

  const [pokemonListState, setPokemonListState] = useState({
    pokedexUrl: DEFAULT_URL,
    pokemonList: [],
    prevUrl: DEFAULT_URL,
    nextUrl: DEFAULT_URL,
  });

  useEffect(() => {
    // getPokemons() returns promise so that i directly used inside toast
    toast.promise(
      getAllPokemons(pokemonListState, setPokemonListState, DEFAULT_URL),
      {
        loading: "Wait! Fetching new Pokemon",
        success: "Successfully fetched new Pokemon",
        error: "Failed to fetch Pokemon",
      }
    );
  }, [pokemonListState.pokedexUrl]);
  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
