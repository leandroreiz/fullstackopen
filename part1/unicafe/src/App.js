import { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ feedback: { good, neutral, bad, all, average } }) => {
  return (
    <>
      <h1>statistics</h1>
      {!good && !neutral && !bad ? (
        <div>No feedback given</div>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={(average / all).toFixed(1)} />
            <StatisticLine
              text="positive"
              value={((good / all) * 100).toFixed(1).toString().concat('%')}
            />
          </tbody>
        </table>
      )}
    </>
  );
};

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

      <Statistics feedback={{ good, neutral, bad, all, average }} />
    </>
  );
};

export default App;
