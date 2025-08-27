// import { StrictMode } from 'react'
import React from "react";
import './styles.css'
import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import ReactDOM from "react-dom/client";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);