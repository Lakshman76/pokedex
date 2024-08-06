import { Link } from "react-router-dom";
import "./Pokemon.css";

const Pokemon = ({ name, url, id }) => {
  return (
    <Link to={`pokemon/${id}`} className="pokemon-wrapper">
      <div className="pokemon">
        <img src={url} alt="img" />
        <h3>{name}</h3>
      </div>
    </Link>
  );
};

export default Pokemon;
