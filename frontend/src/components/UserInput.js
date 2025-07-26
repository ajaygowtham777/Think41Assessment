import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export default function UserInput() {
  const { inputValue, setInputValue, sendMessage, messages, setConversations, setMessages } = useContext(ChatContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleReset = () => {
    setConversations((prev) => [...prev, [...messages]]);
    setMessages([]);
  };

  return (
    <form className="user-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ask something..."
      />
      <button type="submit">Send</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  );
}
