import React from "react";
import ChatWindow from "./components/ChatWindow";
import { ChatProvider } from "./context/ChatContext";
import "./App.css";

function App() {
  return (
    <ChatProvider>
      <ChatWindow />
    </ChatProvider>
  );
}

export default App;
