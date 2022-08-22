import axios from 'axios';
import { useState, useEffect } from 'react';
import Search from './components/Search';
import Results from './components/Results';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  const filteredCountriesList = query
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      )
    : countries;

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data));
  }, []);

  const handleSearchQuery = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <Search onChange={handleSearchQuery} value={query} />
      <Results countries={filteredCountriesList} />
    </>
  );
}

export default App;
