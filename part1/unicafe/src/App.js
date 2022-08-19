import { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);

  const handleGood = () => {
    setAll(all + 1);
    setGood(good + 1);
    setAverage(average + 1);
  };

  const handleNeutral = () => {
    setAll(all + 1);
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setAll(all + 1);
    setBad(bad + 1);
    setAverage(average - 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />

      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {average ? average / all : 0}</div>
      <div>positive {good ? (good / all) * 100 : 0} %</div>
    </>
  );
};

export default App;
