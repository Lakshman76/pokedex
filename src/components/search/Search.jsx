import useDebounce from "../../hooks/useDebounce";
import "./Search.css";

const Search = ({ updateSearchItem }) => {
  const debounceUpdateSearch = useDebounce((e) => updateSearchItem(e.target.value), 1000)
  return (
    <input
      id="search-pokemon"
      type="text"
      placeholder="Which pokemon you're looking for?"
      onChange={debounceUpdateSearch}
    />
  );
};

export default Search;
