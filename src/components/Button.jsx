import React from "react";

const Button = ({ children, ...props }) => (
  <button {...props} style={{ padding: "8px 16px", margin: "4px" }}>
    {children}
  </button>
);

export default Button;