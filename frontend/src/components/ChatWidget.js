import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  IconButton, 
  Fab, 
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  CircularProgress,
  Divider
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { sendMessage, getChatHistory } from '../services/chatApi';

const ChatWidget = ({ location }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch chat history when the component mounts
  useEffect(() => {
    if (open) {
      fetchChatHistory();
    }
  }, [open]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatHistory = async () => {
    try {
      setLoading(true);
      const response = await getChatHistory();
      if (response && response.history) {
        setMessages(response.history);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Optimistically add user message to the UI
    const userMessage = { role: 'user', content: newMessage };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    setLoading(true);

    try {
      const response = await sendMessage(newMessage, location);
      if (response && response.message) {
        const botMessage = { role: 'assistant', content: response.message };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again later.' 
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Chat Fab Button */}
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000
        }}
        onClick={toggleChat}
      >
        <ChatIcon />
      </Fab>

      {/* Chat Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 350 },
            maxWidth: '100%',
            height: { xs: '100%', sm: 500 },
            maxHeight: { xs: '100%', sm: '80vh' },
            bottom: { xs: 0, sm: 'auto' },
            top: { xs: 'auto', sm: 'auto' },
            position: { xs: 'fixed', sm: 'fixed' },
            borderRadius: { xs: '16px 16px 0 0', sm: 2 },
            marginBottom: { xs: 0, sm: 2 },
            marginRight: { xs: 0, sm: 2 }
          }
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            p: 2,
            backgroundColor: 'primary.main',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6">Travel Assistant</Typography>
          <IconButton color="inherit" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Messages Area */}
        <Box
          sx={{
            p: 2,
            height: 'calc(100% - 130px)',
            overflowY: 'auto',
            backgroundColor: '#f5f5f5'
          }}
        >
          {loading && messages.length === 0 ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {messages.map((msg, index) => (
                <ListItem
                  key={index}
                  sx={{
                    textAlign: msg.role === 'user' ? 'right' : 'left',
                    mb: 1
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                      alignItems: 'flex-start',
                      width: '100%'
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: msg.role === 'user' ? 'primary.main' : 'secondary.main',
                        ml: msg.role === 'user' ? 1 : 0,
                        mr: msg.role === 'user' ? 0 : 1
                      }}
                    >
                      {msg.role === 'user' ? 'U' : 'A'}
                    </Avatar>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        maxWidth: '80%',
                        backgroundColor: msg.role === 'user' ? 'primary.light' : 'white',
                        color: msg.role === 'user' ? 'white' : 'text.primary',
                        borderRadius: msg.role === 'user' 
                          ? '16px 16px 0 16px' 
                          : '16px 16px 16px 0'
                      }}
                    >
                      <Typography variant="body1">{msg.content}</Typography>
                    </Paper>
                  </Box>
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          )}
        </Box>

        <Divider />

        {/* Input Area */}
        <Box
          sx={{
            p: 2,
            backgroundColor: 'background.paper',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <TextField
            fullWidth
            placeholder="Type your message..."
            variant="outlined"
            size="small"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            sx={{ mr: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || loading}
          >
            Send
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatWidget;
