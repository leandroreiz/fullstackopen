const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  // destructing the object course
  const { name, parts } = course;

  const Part = ({ name, exercises }) => <p>{`${name}: ${exercises}`}</p>;

  const Header = ({ name }) => <h1>{name}</h1>;

  const Content = ({ parts }) => (
    <>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />
    </>
  );

  const Total = ({ parts }) => (
    <p>
      {`Number of exercises: ${
        parts[0].exercises + parts[1].exercises + parts[2].exercises
      }`}
    </p>
  );

  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
