import { useEffect } from 'react';
import { useState } from 'react';
import CountryDetails from './CountryDetails';

const Results = ({ countries }) => {
  const [countriesList, setCountriesList] = useState([]);

  // loads the initial state and updates it always when 'countries' is modified
  useEffect(() => {
    setCountriesList(countries);
  }, [countries]);

  const handleShowCountry = (event) => {
    const country = countriesList.filter(
      (country) => country.name.common === event.target.value
    );
    setCountriesList(country);
  };

  if (countriesList.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countriesList.length === 1) {
    const country = countriesList[0];
    return <CountryDetails country={country} />;
  }

  // if less than 10 and more than 1 result, render the list below
  return countriesList.map((country) => (
    <div key={country.ccn3}>
      {country.name.common}
      <button onClick={handleShowCountry} value={country.name.common}>
        show
      </button>
    </div>
  ));
};

export default Results;
