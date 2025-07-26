import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import MessageList from "./MessageList";
import UserInput from "./UserInput";

export default function ChatWindow() {
  const { conversations, setMessages, setInputValue, setConversations } = useContext(ChatContext);

  const loadConversation = (index) => {
    setMessages(conversations[index]);
  };

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <h3>Past Sessions</h3>
        {conversations.map((conv, idx) => (
          <button key={idx} onClick={() => loadConversation(idx)}>
            Session {idx + 1}
          </button>
        ))}
      </aside>
      <main className="chat-main">
        <MessageList />
        <UserInput />
      </main>
    </div>
  );
}
