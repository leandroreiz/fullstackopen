import Header from './Header';
import Content from './Content';
import TotalOfExercises from './TotalOfExercises';

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <TotalOfExercises parts={course.parts} />
    </>
  );
};

export default Course;
