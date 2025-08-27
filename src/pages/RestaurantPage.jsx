import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMenuManager } from "../logic/useMenuManager.js";
import MenuList from "../components/MenuList";
import Button from "../components/Button";

const RestaurantPage = () => {
  const { restaurantName } = useParams();
  const { menu } = useMenuManager(restaurantName);
  const navigate = useNavigate();

  if (!menu) {
    return <div>Restaurant not found.</div>;
  }

  return (
    <div>
      <h2>{restaurantName.replace(/-/g, " ")}</h2>
      <MenuList menu={menu} />
      <Button onClick={() => navigate(`/${restaurantName}/admin`)}>Admin</Button>
    </div>
  );
};

export default RestaurantPage;