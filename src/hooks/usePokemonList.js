import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function usePokemonList() {
  const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

  const [pokemonListState, setPokemonListState] = useState({
    pokedexUrl: DEFAULT_URL,
    pokemonList: [],
    prevUrl: DEFAULT_URL,
    nextUrl: DEFAULT_URL,
  });

  async function getAllPokemons() {
    const response = await axios.get(
      pokemonListState.pokedexUrl ? pokemonListState.pokedexUrl : DEFAULT_URL
    );
    const pokemonResults = response.data.results;
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
    setPokemonListState({
      ...pokemonListState,
      pokemonList: pokemonFinalList,
      prevUrl: response.data.previous,
      nextUrl: response.data.next,
    });
  }

  useEffect(() => {
    // getPokemons() returns promise so that i directly used inside toast
    toast.promise(getAllPokemons(), {
      loading: "Wait! Fetching new Pokemon",
      success: "Successfully fetched new Pokemon",
      error: "Failed to fetch Pokemon",
    });
  }, [pokemonListState.pokedexUrl]);
  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
