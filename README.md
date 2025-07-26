# 🛍️ Think41Assessment – AI Chatbot for E-commerce Clothing Site

A full-stack AI-powered chatbot built using **React** and **Flask** to support customer queries for an e-commerce clothing platform. The bot can answer questions like:

- “What are the top 5 most sold products?”
- “Show me the status of order ID 12345.”
- “How many Classic T-Shirts are left in stock?”

---

## 🚀 Features

- 🔹 Ask order- and product-related queries via natural language
- 🔹 View past conversation history
- 🔹 Typing animation + speech recognition + voice response
- 🔹 Responsive, styled chat UI with avatars & timestamps
- 🔹 Dockerized for seamless deployment

---

## 🧠 Project Structure


---

## ⚙️ Installation & Running Locally (Without Docker)

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
pip install -r requirements.txt
python app.py

### Frontend
cd frontend
npm install
npm start

Running with Docker
1. Build and run full stack:
docker compose up --build
2. Access App
Frontend: http://localhost:3000
Backend: http://localhost:5000/chat
