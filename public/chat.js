const ws = new WebSocket(`ws://${location.host}/ws`);

const form = document.getElementById('chat-form');
const input = document.getElementById('message');
const messages = document.getElementById('messages');

// Send message when form is submitted
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value) {
        ws.send(input.value);
        input.value = '';
    }
});

// Display incoming messages
ws.onmessage = (event) => {
    const item = document.createElement('div');
    item.textContent = event.data;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
};
