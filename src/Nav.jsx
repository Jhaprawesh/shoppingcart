import React from "react";

function Nav(props) {
  return (
    <>
      <div>
        <label htmlFor="brand">Filter by Brand</label>
        <select
          className="select select-primary w-full max-w-xs"
          onChange={props.click}
        >
          <option value={"All"}>All</option>
          {props.brand.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Nav;
