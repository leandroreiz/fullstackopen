const Search = ({ onChange, value }) => {
  return (
    <div>
      find countries <input onChange={onChange} value={value} />
    </div>
  );
};

export default Search;
