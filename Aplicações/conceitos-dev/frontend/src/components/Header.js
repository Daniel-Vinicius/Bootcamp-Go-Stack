import React from "react";
import "../App.css";

export default function Header({ title, children }) {
  return (
    <div>
      <h2 className="h2zola">{title}</h2>

      {children}
    </div>
  );
}
