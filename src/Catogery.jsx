import React from "react";

function Catogery(props) {
  return (
    <>
      <div>
        <label htmlFor="brand">Filter by Catogery</label>
        <select
          className="select select-info w-full max-w-xs"
          onChange={props.clickCat}
        >
          <option value={"All"}>All</option>
          {props.cat.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Catogery;
