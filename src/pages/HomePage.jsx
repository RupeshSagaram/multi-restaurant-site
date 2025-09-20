import React from "react";
import { Link } from "react-router-dom";
import { RESTAURANTS } from "../constants/restaurants";

const HomePage = () => (
  <div>
    <h2>Welcome to Multi-Restaurant Platform</h2>
    <div className="restaurant-grid">
      {RESTAURANTS.map((r) => (
        <div key={r} className="restaurant-card">
          <div className="restaurant-image">
            <img src={`/images/${r}.svg`} alt={r.replace(/-/g, " ")} />
          </div>
          <div className="restaurant-content">
            <h3>{r.replace(/-/g, " ")}</h3>
            <Link to={`/${r}`} className="restaurant-link">
              View Menu
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HomePage;