import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function usePokemon(id) {
  const POKEMON_DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemonDetails, setPokemonDetails] = useState(null);

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
  }

  useEffect(() => {
    toast.promise(getPokemonDetails(id), {
      loading: "Wait! Fetching details of Pokemon",
      success: "Successfully fetched details of Pokemon",
      error: "Failed to fetch Pokemon details",
    });
  }, []);
  return [pokemonDetails];
}

export default usePokemon;
