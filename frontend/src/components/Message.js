import React from "react";

export default function Message({ sender, text }) {
  return (
    <div className={`message ${sender}`}>
      <span className="avatar">{sender === "user" ? "👤" : "🤖"}</span>
      <p>{text}</p>
    </div>
  );
}
