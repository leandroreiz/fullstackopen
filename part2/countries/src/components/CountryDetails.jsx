const CountryDetails = ({ country }) => {
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
    </>
  );
};

export default CountryDetails;
