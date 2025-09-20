import React from "react";
import { Link } from "react-router-dom";
import { RESTAURANTS } from "../constants/restaurants";

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link>
    {RESTAURANTS.map((name) => (
      <Link key={name} to={`/${name}`} style={{ marginLeft: 16 }}>
        {name.replace(/-/g, " ")}
      </Link>
    ))}
    <Link to="/pizza-hut/admin" style={{ marginLeft: 16 }}>Admin</Link>
  </nav>
);

export default Navbar;