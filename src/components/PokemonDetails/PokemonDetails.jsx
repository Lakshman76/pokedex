import "./PokemonDetails.css";
import { Link, useParams } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import usePokemon from "../../hooks/usePokemon";
import Pokemon from "../pokemon/Pokemon";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemonDetails, pokemonListState] = usePokemon(id);
  console.log(pokemonListState);

  return (
    <>
      <Link to="/" className="back">
        <MdArrowBackIos />
        Back to Pokedex
      </Link>
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
      <div className="related-pokemons">
        <h1>Related Pokemons</h1>
        <div className="related-pokemons-wrapper">
          {pokemonListState.pokemonList.length > 0 ? (
            pokemonListState.pokemonList.map((pokemon) => (
              <Pokemon
                name={pokemon.name}
                key={pokemon.id}
                url={pokemon.image}
                id={pokemon.id}
              />
            ))
          ) : (
            <h3>Loading....</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default PokemonDetails;
