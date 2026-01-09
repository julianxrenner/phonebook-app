import React from "react";

const Persons = (props) => {
  console.log(props.people);
  return props.people.map((person) => (
    <div key={person.id}>
        <p>{person.name} {person.number} <button type='submit' onClick={(event)=>{props.handleDelete(event, person)}}>Delete</button></p>
    </div>
  ));
};

export default Persons;
