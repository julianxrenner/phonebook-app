import React from "react";

const Filter = ({ persons, handleChange, filter }) => {
  return (
    <form>
      <div>
        filter shown with: <input value={filter} onChange={handleChange} />
      </div>
    </form>
  );
};

export default Filter;
