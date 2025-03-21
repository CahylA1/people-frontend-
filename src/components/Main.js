import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  //  people state
  const [people, setPeople] = useState(null);

  const URL = "http://localhost:3001/people/";

  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (person) => {
    // make post request to create people
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };

  const updatePeople = async (person, id) => {
    // make put request to create people
    await fetch(URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    });
    getPeople();
  };

  const deletePeople = async (id) => {
    // make delete request to create people
    await fetch(URL + id, {
      method: "DELETE",
    });
    // update list of people
    getPeople();
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={<Index people={people} createPeople={createPeople} />}
        />
        <Route
          path="/people/:id"
          element={
            <Show
              people={people}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default Main;
