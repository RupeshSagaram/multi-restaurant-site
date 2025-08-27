import React from "react";

const MenuItem = ({ item }) => (
  <div className="menu-item">
    <h4>{item.name}</h4>
    <p>{item.description}</p>
    <span>${item.price}</span>
  </div>
);

export default MenuItem;