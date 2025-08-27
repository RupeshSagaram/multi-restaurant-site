import React from "react";
import { Link } from "react-router-dom";

const restaurants = ["pizza-hut", "burger-king", "sushi-place"];

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link>
    {restaurants.map((name) => (
      <Link key={name} to={`/${name}`} style={{ marginLeft: 16 }}>
        {name.replace(/-/g, " ")}
      </Link>
    ))}
  </nav>
);

export default Navbar;