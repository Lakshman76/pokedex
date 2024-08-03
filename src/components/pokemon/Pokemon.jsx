import "./Pokemon.css"

const Pokemon = ({name, url}) => {
  return (
    <div className="pokemon">
        <img src={url} alt="img" />
        <h3>{name}</h3>
    </div>
  )
}

export default Pokemon