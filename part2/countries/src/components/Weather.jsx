const Weather = ({ city, forecast }) => {
  return (
    <div>
      <h2>{`Weather in ${city}`}</h2>
      <div>{`temperature ${forecast.main.temp} Celcius`}</div>
      <img
        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
        alt={forecast.weather[0].description}
      />
      <div>{`wind ${forecast.wind.speed} m/s`}</div>
    </div>
  );
};

export default Weather;
