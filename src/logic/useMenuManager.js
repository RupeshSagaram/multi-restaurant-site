import { useState } from "react";
import { dummyMenus } from "./dummyData";

export const useMenuManager = (restaurantName) => {
  const [menu, setMenu] = useState(dummyMenus[restaurantName] || []);

  const addMenuItem = (item) => {
    setMenu((prev) => [...prev, item]);
  };

  return { menu, addMenuItem };
};