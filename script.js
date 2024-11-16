document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("sendButton");
    const userInput = document.getElementById("userInput");
    const chatContainer = document.getElementById("chatContainer");
    const newChatButton = document.getElementById("newChatButton");

    // Send message on button click
    sendButton.addEventListener("click", sendMessage);

    // Send message on pressing Enter
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Start a new chat
    newChatButton.addEventListener("click", () => {
        chatContainer.innerHTML = ""; // Clear chat
        userInput.value = ""; // Clear input
    });

    // Function to send message
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user's message to the chat
        addMessageToChat("user", message);

        // Add typing animation for bot
        addTypingAnimation();

        try {
            // Make a POST request to the backend API
            const response = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: message }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            const botResponse = data.response;

            // Update the last bot message with the response
            updateLastBotMessage(botResponse);
        } catch (error) {
            console.error("Error:", error);
            updateLastBotMessage("Sorry, there was an error. Please try again.");
        }

        userInput.value = ""; // Clear input field
    }

    // Add message to chat
    function addMessageToChat(sender, text) {
        const messageBubble = document.createElement("div");
        messageBubble.classList.add("chat-message", sender);
        messageBubble.textContent = text;
        chatContainer.appendChild(messageBubble);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
    }

    // Add typing animation
    function addTypingAnimation() {
        const messageBubble = document.createElement("div");
        messageBubble.classList.add("chat-message", "bot");
        messageBubble.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
        chatContainer.appendChild(messageBubble);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Update last bot message
    function updateLastBotMessage(response) {
        const botMessages = document.querySelectorAll(".chat-message.bot");
        if (botMessages.length) {
            botMessages[botMessages.length - 1].textContent = response;
        }
    }
});
