import api from './api';

// Generate a random user ID for the current session
const generateUserId = () => {
  return 'user_' + Math.random().toString(36).substring(2, 15);
};

// Get or create a user ID from local storage
const getUserId = () => {
  let userId = localStorage.getItem('chat_user_id');
  if (!userId) {
    userId = generateUserId();
    localStorage.setItem('chat_user_id', userId);
  }
  return userId;
};

// Send a message to the chat API
export const sendMessage = (message, location = null) => {
  const userId = getUserId();
  return api.post('/chat/send', { 
    message, 
    user_id: userId,
    location 
  });
};

// Get chat history for the current user
export const getChatHistory = () => {
  const userId = getUserId();
  return api.get('/chat/history', { 
    params: { user_id: userId } 
  });
};

export default {
  sendMessage,
  getChatHistory,
  getUserId
};
