const Filter = ({ setFilter }) => (
  <>
    Filter:
    <br />
    <input type="search" onChange={({ target }) => setFilter(target.value)} />
  </>
);

export default Filter;
