import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  // 👂 Voice Input
  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };
  };

  // 📢 Voice Output
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = {
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChat(prev => [...prev, userMsg]);
    setMessage('');
    setIsTyping(true);

    try {
      const res = await axios.post('http://localhost:5000/chat', { message });
      const botMsg = {
        sender: 'bot',
        text: res.data.response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChat(prev => [...prev, botMsg]);
      speak(res.data.response); // Speak out the response
    } catch {
      const botMsg = {
        sender: 'bot',
        text: '❌ Unable to reach server.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChat(prev => [...prev, botMsg]);
    }

    setIsTyping(false);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReset = () => {
    setChat([]);
    setMessage('');
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>🛒 Think41 Voice Chatbot</h2>

        <div style={styles.chatWindow}>
          {chat.map((msg, i) => (
            <div key={i} style={{
              ...styles.messageRow,
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              {msg.sender === 'bot' && <div style={styles.avatar}>🤖</div>}
              <div style={{
                ...styles.messageBubble,
                backgroundColor: msg.sender === 'user' ? '#DCF8C6' : '#F1F0F0',
                borderRadius: msg.sender === 'user'
                  ? '18px 18px 0 18px'
                  : '18px 18px 18px 0',
              }}>
                <div>{msg.text}</div>
                <div style={styles.time}>{msg.time}</div>
              </div>
              {msg.sender === 'user' && <div style={styles.avatar}>🧑</div>}
            </div>
          ))}

          {isTyping && (
            <div style={{ ...styles.messageRow, justifyContent: 'flex-start' }}>
              <div style={styles.avatar}>🤖</div>
              <div style={{ ...styles.messageBubble, fontStyle: 'italic', color: '#888' }}>
                Bot is typing...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div style={styles.inputArea}>
          <input
            type="text"
            value={message}
            placeholder="Ask me something..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={styles.input}
          />
          <button onClick={handleSend} style={styles.sendBtn}>Send</button>
          <button onClick={handleVoiceInput} style={styles.voiceBtn}>🎙️</button>
          <button onClick={handleReset} style={styles.resetBtn}>Reset</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #74ebd5, #ACB6E5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    maxWidth: 700,
    width: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 20,
  },
  chatWindow: {
    height: '400px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: 10,
    backgroundColor: '#fefefe',
    marginBottom: 15,
  },
  messageRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 10,
  },
  avatar: {
    fontSize: 24,
    marginBottom: 2,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: '10px 15px',
    fontSize: 14,
    lineHeight: 1.5,
    color: '#2c3e50',
    backgroundColor: '#eee',
    borderRadius: '16px',
  },
  time: {
    fontSize: 11,
    color: '#777',
    marginTop: 5,
    textAlign: 'right',
  },
  inputArea: {
    display: 'flex',
    gap: 10,
    marginTop: 10,
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    fontSize: 15,
    borderRadius: 8,
    border: '1px solid #ccc',
  },
  sendBtn: {
    padding: '10px 16px',
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: 14,
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
  },
  voiceBtn: {
    padding: '10px 14px',
    backgroundColor: '#27ae60',
    color: '#fff',
    fontSize: 16,
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
  },
  resetBtn: {
    padding: '10px 16px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    fontSize: 14,
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
  },
};

export default ChatBox;
