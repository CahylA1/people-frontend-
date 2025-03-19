import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function Show(props) {
  const { id } = useParams(); // extract id from URL params
  const people = props.people;
  const person = people.find((p) => p._id === id); // Ensure's people exist before searching
  const navigate = useNavigate(); // useNavigate replaces history.push
  // form state
  const [editForm, setEditForm] = useState(person);

  // handleChange function for form
  const handleChange = (event) => {
    setEditForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  //handleSubmit for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.updatePeople(editForm, person._id);
    // redirect people back to index
    navigate("/");
  };

  const removePerson = () => {
    props.deletePeople(person._id);
    navigate("/");
  };
  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <button id="delete" onClick={removePerson}>
        DELETE{" "}
      </button>
      <img src={person.image} alt={person.name} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="URL image"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Update person" />
      </form>
    </div>
  );
}

export default Show;
