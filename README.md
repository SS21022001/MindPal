# Mental Health AI Chatbot

## Overview

The **Mental Health AI Chatbot** is a web-based application designed to provide mental health support through conversational AI. The chatbot is powered by advanced AI models and offers a friendly, empathetic environment for users to discuss their mental health concerns. It provides basic emotional support, helps with managing stress, and offers mental health advice based on user inputs.

This project consists of:
- A **React frontend** for the user interface
- A **Flask backend** to handle requests and manage interactions
- Integration with AI models for understanding and responding to user inputs

## Features

- **AI-Powered Conversations**: Use AI models (such as GPT-based models or fine-tuned models) to interact with users and provide mental health support.
- **Personalized Conversations**: Based on user input, the chatbot tailors responses to provide relevant advice and emotional support.
- **Emotion Recognition**: The chatbot detects the emotional tone of the user and responds empathetically.
- **Session History**: Users can view their past conversations for reference.
- **Data Security**: User conversations are stored securely, ensuring privacy and confidentiality.

## Requirements

### Backend (Flask API)

- Python 3.7+
- Flask
- Flask-Cors
- Hugging Face Transformers (for AI models)
- Llama3 or any fine-tuned model for mental health support

### Frontend (React)

- Node.js (v16 or later)
- React
- Axios (for API requests)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mental-health-chatbot.git
cd mental-health-chatbot
