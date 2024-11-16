from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_ollama import OllamaLLM
from textblob import TextBlob
import random

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize Ollama model using LangChain
model = OllamaLLM(model="llama3")

# Define the psychologist persona
system_message = """
You are a compassionate and empathetic psychologist. You listen actively and respond in a gentle, understanding, and non-judgmental way. When someone shares their feelings, you acknowledge and validate their emotions, offering encouragement, comfort, and gentle advice. You never rush the conversation and always give the user space to express themselves. Your goal is to help them feel heard and supported.
"""

# Function to detect sentiment
def analyze_sentiment(text):
    blob = TextBlob(text)
    sentiment = blob.sentiment.polarity  # Returns a value between -1 (negative) and 1 (positive)
    
    if sentiment < -0.3:
        return 'sad'
    elif sentiment > 0.3:
        return 'happy'
    else:
        return 'neutral'

# Function to generate diverse responses
def get_diverse_response(user_input):
    responses = [
        "I understand how you feel, can you tell me more about it?",
        "I'm here for you, it's okay to feel like that. How has your day been?",
        "I'm listening, would you like to share what’s been on your mind?",
        "It's tough, but you're doing great by talking about it. What else is bothering you?"
    ]
    return random.choice(responses)

@app.route('/chat', methods=['POST'])
def chat_with_ollama():
    user_input = request.json.get('message')
    
    if not user_input:
        return jsonify({"error": "Message is required"}), 400

    try:
        # Analyze sentiment and adjust the system message based on it
        sentiment = analyze_sentiment(user_input)

        # Modify the response based on the sentiment
        if sentiment == 'sad':
            response = "I'm really sorry you're feeling down. Let's talk more about what's going on."
        elif sentiment == 'happy':
            response = "That's wonderful to hear! What’s been going well in your life?"
        else:
            response = get_diverse_response(user_input)

        # Combine the system message with the user input to guide the model's response
        prompt = system_message + "\nUser: " + user_input + "\nPsychologist: " + response

        # Use OllamaLLM to get a response
        result = model.invoke(input=prompt)
        return jsonify({"response": result})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
