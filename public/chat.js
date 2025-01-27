const ws = new WebSocket(`wss://${location.host}/ws`);

const nicknameForm = document.getElementById('nickname-form');
const chatForm = document.getElementById('chat-form');
const nicknameInput = document.getElementById('nickname');
const messageInput = document.getElementById('message');
const messages = document.getElementById('messages');

let nickname = '';

// Set nickname
nicknameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    nickname = nicknameInput.value.trim();
    if (nickname) {
        nicknameForm.style.display = 'none';
        chatForm.style.display = 'block';
        messageInput.focus();
    }
});

// Send message
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message && nickname) {
        ws.send(JSON.stringify({ nickname, message }));
        messageInput.value = '';
        messageInput.focus();
    }
});

// Display incoming messages
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const item = document.createElement('li');
    item.innerHTML = `<strong>${data.nickname}:</strong> ${data.message}`;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight; // Scroll to the bottom
};
