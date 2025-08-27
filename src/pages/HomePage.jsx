import React from "react";
import { Link } from "react-router-dom";

const restaurants = ["pizza-hut", "burger-king", "sushi-place"];

const HomePage = () => (
  <div>
    <h2>Welcome to Multi-Restaurant Platform</h2>
    <ul>
      {restaurants.map((r) => (
        <li key={r}>
          <Link to={`/${r}`}>{r.replace(/-/g, " ")}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default HomePage;