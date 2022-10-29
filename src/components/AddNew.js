const AddNew = (props) => (
  <>
    <h2>Add New</h2>
    <form>
      <div>
        Name:
        <br />
        <input
          value={props.newName}
          onChange={({ target }) => props.setNewName(target.value)}
        />
      </div>
      <div>
        Number:
        <br />
        <input
          value={props.newPhone}
          onChange={({ target }) => props.setNewPhone(target.value)}
        />
      </div>
      <button
        type="submit"
        onClick={(ev) => {
          ev.preventDefault();
          props.handleAdd();
        }}
      >
        Add
      </button>
    </form>
  </>
);

export default AddNew;
