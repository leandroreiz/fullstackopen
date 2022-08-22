import axios from 'axios';
import { useEffect, useState } from 'react';

import Weather from './Weather';

const CountryDetails = ({ country }) => {
  const [forecast, setForecast] = useState(null);

  const api_key = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital},${country.ccn3}&appid=${api_key}`
      )
      .then((response) => response.data)
      .then((location) => {
        const lat = location[0].lat;
        const lon = location[0].lon;
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
          )
          .then((response) => setForecast(response.data));
      });
  }, [country, api_key]);

  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <div>population {country.population} </div>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`${country.name.common} flag`}
        style={{ height: '150px' }}
      />
      {forecast && <Weather city={country.capital} forecast={forecast} />}
    </>
  );
};

export default CountryDetails;
