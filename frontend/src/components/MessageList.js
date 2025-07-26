import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";

export default function MessageList() {
  const { messages, isTyping } = useContext(ChatContext);
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <Message key={index} sender={msg.sender} text={msg.text} />
      ))}
      {isTyping && <p><i>Bot is typing...</i></p>}
    </div>
  );
}
