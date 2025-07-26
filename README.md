# 🛍️ E-commerce Customer Support Chatbot

This is a full-stack AI-powered customer support chatbot built for an e-commerce clothing website. It answers user queries like:

- 🏆 “What are the top 5 most sold products?”
- 📦 “Show me the status of order ID 12345.”
- 🧥 “How many Classic T-Shirts are left in stock?”

---

## 🔧 Tech Stack

- **Frontend**: React (with speech recognition, voice output, and chat UI)
- **Backend**: Flask + Pandas (for data processing from CSV)
- **Dataset**: [Recruit41 Ecommerce Dataset](https://github.com/recruit41/ecommerce-dataset)
- **Voice Features**: Web Speech API
- **Version Control**: Git & GitHub

---

## ✨ Features

- 🔍 Query understanding and data retrieval using NLP
- 🗣️ Voice input and text-to-speech response
- 📈 Realtime chat-like UI with typing animation and avatars
- 🔁 Reset button to clear chat
- 🎯 Answers stock, order, and product queries using CSV-based backend

---

## ⚙️ How to Run

### 🔹 Backend
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install flask pandas
python app.py

cd frontend
npm install
npm start

