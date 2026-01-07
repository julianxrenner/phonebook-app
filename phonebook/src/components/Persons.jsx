import React from "react";

const Persons = ({ people }) => {
  console.log(people);
  return people.map((person) => (
    <div key={person.id}>
      {person.name} {person.number}
    </div>
  ));
};

export default Persons;
