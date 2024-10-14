const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');  // Required to handle file paths correctly

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming requests
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Chatbot logic
app.post('/message', (req, res) => {
    const userMessage = req.body.message.toLowerCase();  // Convert to lowercase for easier matching

    let botResponse;

    if (userMessage.includes('hello') || userMessage.includes('hi')) {
        botResponse = 'Hello! How can I assist you today?';
    } else if (userMessage.includes('help')) {
        botResponse = 'I am here to assist you. You can ask about bookings, services, pricing, consultations, or products.';
    } else if (userMessage.includes('pricing')) {
        botResponse = 'Our pricing information is available at www.example.com/pricing. Is there a specific product or service you need pricing for?';
    } else if (userMessage.includes('services')) {
        botResponse = 'We offer a variety of services including bookings, consultations, and product information. What would you like to know more about?';
    } else if (userMessage.includes('products')) {
        botResponse = 'We offer products in categories such as electronics, clothing, and food. Would you like more details about a specific category?';
    } else if (userMessage.includes('consultation')) {
        botResponse = 'We offer free consultations. Would you like to schedule one? If so, please provide a preferred date.';
    } else if (userMessage.includes('book') || userMessage.includes('booking')) {
        const bookingDate = userMessage.match(/\d{4}-\d{2}-\d{2}/);  // Match a date like YYYY-MM-DD
        if (bookingDate) {
            botResponse = `Great! I have noted your booking for ${bookingDate[0]}. We will confirm it shortly.`;
        } else {
            botResponse = 'Sure! What date would you like to book? Please provide it in the format YYYY-MM-DD.';
        }
    } else if (userMessage.includes('refund')) {
        botResponse = 'Our refund policy can be found at www.example.com/refund-policy. Feel free to ask if you have any questions.';
    } else if (userMessage.includes('contact support')) {
        botResponse = 'You can contact our support team at support@example.com or call us at +123-456-7890. How else can I assist you?';
    } else {
        botResponse = 'Sorry, I didn’t understand that. Could you please clarify or ask for help?';
    }

    // Send the bot response back to the client
    res.json({ reply: botResponse });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

