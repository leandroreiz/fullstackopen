import { useState } from 'react';

// #region Custom components
const Anecdote = ({ title, anecdotes, selected, votes }) => (
  <>
    <h1>{title}</h1>
    <div>{anecdotes[selected]}</div>
    <div>{`has ${votes[selected]} votes`}</div>
  </>
);

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
// #endregion

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length)); // creates a zero-filled array
  const [mostVoted, setMostVoted] = useState(0);

  // returns a random number
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  // set the most voted anecdote
  const getMostVoted = (data) => {
    const max = Math.max(...data);
    setMostVoted(data.indexOf(max));
  };

  // go to a random anecdote
  const handleNextAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length));
  };

  // register the vote for the selected anecdote
  const handleVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected]++;
    getMostVoted(updatedVotes);
    setVotes(updatedVotes);
  };

  // rendering the application
  return (
    <>
      <Anecdote
        title="Anecdote of the day"
        anecdotes={anecdotes}
        selected={selected}
        votes={votes}
      />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNextAnecdote} text="next anecdote" />
      <Anecdote
        title="Anecdote with most votes"
        anecdotes={anecdotes}
        selected={mostVoted}
        votes={votes}
      />
    </>
  );
};

export default App;
