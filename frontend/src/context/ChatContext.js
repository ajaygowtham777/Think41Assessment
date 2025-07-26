import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState([]);

  const sendMessage = async (messageText) => {
    const newMessage = { text: messageText, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error contacting server.", sender: "bot" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        inputValue,
        setInputValue,
        sendMessage,
        isTyping,
        conversations,
        setConversations,
        setMessages
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
