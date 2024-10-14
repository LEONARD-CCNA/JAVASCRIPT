document.getElementById('send-btn').addEventListener('click', async function() {
    const userInput = document.getElementById('user-input').value;
    
    // Display user message in chat box
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById('user-input').value = '';

    // Send user message to chatbot (via POST request)
    const response = await fetch('/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();

    // Display bot response in chat box
    chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.reply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
});
