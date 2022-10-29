const Persons = ({ filtered, handleDelete }) => (
  <>
    <h2>Persons</h2>
    <ul>
      {filtered.map((person) => (
        <li key={person.id}>
          {person.name} {person.phone}{' '}
          <button onClick={() => handleDelete(person.id, person.name)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  </>
);

export default Persons;
