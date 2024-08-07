import { useEffect, useState } from "react";
import "./PokemonDetails.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { MdArrowBackIos } from "react-icons/md";

const PokemonDetails = () => {
  const { id } = useParams();
  const POKEMON_DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemonDetails, setPokemonDetails] = useState(null);

  async function getPokemonDetails() {
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
    toast.promise(getPokemonDetails(), {
      loading: "Wait! Fetching details of Pokemon",
      success: "Successfully fetched details of Pokemon",
      error: "Failed to fetch Pokemon details",
    });
  }, []);
  return (
    <>
    <Link to="/" className="back"><MdArrowBackIos />Back to Pokedex</Link>
    {pokemonDetails && (
      <div className="pokemonDetails-wrapper">
        <div className="pokemonDetails-img">
          <img src={pokemonDetails.image} />
        </div>
        <div className="pokemonDetails">
          <div className="pokemonDetails-name">
            Name : <span>{pokemonDetails.name}</span>
          </div>
          <div className="pokemonDetails-height">
            Height:<span> {pokemonDetails.height}m</span>
          </div>
          <div className="pokemonDetails-weight">
          Weight: <span>{pokemonDetails.weight}kg</span>
          </div>
          <div className="pokemonDetails-type">
            
            Type:{" "}
            {pokemonDetails.types.map((t) => (
              <span key={t.type.name}>{t.type.name}</span>
            ))}
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default PokemonDetails;
