import React, { useState } from "react";
import Button from "./Button";

const AdminForm = ({ onAddMenuItem }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    onAddMenuItem({ name, description: desc, price });
    setName("");
    setDesc("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button type="submit">Add Item</Button>
    </form>
  );
};

export default AdminForm;