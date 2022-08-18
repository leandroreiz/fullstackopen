const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  // Define parts array
  const parts = [
    { title: part1, numOfExercises: exercises1 },
    { title: part2, numOfExercises: exercises2 },
    { title: part3, numOfExercises: exercises3 },
  ];

  const Header = ({ courseTitle }) => <h1>{courseTitle}</h1>;

  const Part = ({ title, numOfExercises }) => (
    <p>{`${title}: ${numOfExercises}`}</p>
  );

  const Content = ({ parts }) =>
    parts.map((part, idx) => (
      <Part title={part.title} numOfExercises={part.numOfExercises} key={idx} />
    ));

  const Total = ({ parts }) => (
    <p>
      {`Number of exercises: ${parts.reduce(
        (acc, part) => acc + part.numOfExercises,
        0
      )}`}
    </p>
  );

  return (
    <div>
      <Header courseTitle={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
