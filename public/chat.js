const ws = new WebSocket(`ws://${location.host}/ws`);

const form = document.getElementById('chat-form');
const input = document.getElementById('message');
const messages = document.getElementById('messages');

input.focus();

// Scroll to the bottom of the messages box
const scrollToBottom = () => {
    messages.scrollTop = messages.scrollHeight;
};

// Send message when form is submitted
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value) {
        ws.send(input.value);
        input.value = '';
        input.focus(); // Refocus the input box
    }
});

// Display incoming messages
ws.onmessage = (event) => {
    const item = document.createElement('li');
    item.textContent = event.data;
    messages.appendChild(item);
    scrollToBottom(); // Scroll to the latest message
};
