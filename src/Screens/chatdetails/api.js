// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://calculator.acuitysoftware.co/Calculator',
});

export const sendMessage = (chatId, message) => {
  return api.post('/send_message.php', { chatId, message });
};

export const getMessages = (chatId) => {
  return api.get('/get_messages.php', { params: { chatId } });
};
