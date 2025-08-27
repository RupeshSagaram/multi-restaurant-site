import React from "react";
import MenuItem from "./MenuItem";

const MenuList = ({ menu }) => (
  <div>
    {menu.length === 0 ? (
      <p>No menu items yet.</p>
    ) : (
      menu.map((item, idx) => <MenuItem key={idx} item={item} />)
    )}
  </div>
);

export default MenuList;