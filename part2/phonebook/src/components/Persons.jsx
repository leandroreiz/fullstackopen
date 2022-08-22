import Person from './Person';

const Persons = ({ persons, onClick }) => {
  return persons.map((person) => (
    <Person key={person.id} onClick={onClick} person={person} />
  ));
};

export default Persons;
