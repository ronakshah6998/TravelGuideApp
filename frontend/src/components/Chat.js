import React, { useState, useRef } from "react";

const initialMessages = [
  {
    id: 1,
    content: `<div class='flex items-start'>
      <div class='bg-blue-100 text-blue-800 p-2 rounded-full mr-3'>
        <i class='fas fa-globe-americas'></i>
      </div>
      <div>
        <p>Hello fellow traveler! 🌍 I'm your World Explorer assistant, here to help you discover amazing places, plan your trips, and learn about different cultures.</p>
        <p class='mt-2'>Where would you like to explore today?</p>
      </div>
    </div>`,
    isUser: false
  }
];

const quickSuggestions = [
  { text: "Best beaches", icon: "umbrella-beach" },
  { text: "Famous landmarks", icon: "monument" },
  { text: "Budget tips", icon: "wallet" },
  { text: "Travel itineraries", icon: "route" }
];

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typingIndicator, setTypingIndicator] = useState(false);
  const chatContainerRef = useRef(null);

  // Scroll to bottom when messages update
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, typingIndicator]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now(),
      content: input,
      isUser: true
    };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    handleBotResponse(input);
  };

  const handleBotResponse = (userInput) => {
    setTypingIndicator(true);
    setTimeout(() => {
      setTypingIndicator(false);
      setMessages((msgs) => [
        ...msgs,
        {
          id: Date.now() + 1,
          content:
            `<div class='flex items-start'>
              <div class='bg-blue-100 text-blue-800 p-2 rounded-full mr-3'>
                <i class='fas fa-globe-americas'></i>
              </div>
              <div>
                <p>Thanks for your question about <b>${userInput}</b>! (This is a sample response.)</p>
                <p class='mt-2'>Ask about destinations, tips, or travel ideas!</p>
              </div>
            </div>`,
          isUser: false
        }
      ]);
    }, 1200);
  };

  const sendQuickQuestion = (text) => {
    setInput(text);
    setTimeout(() => sendMessage(), 100);
  };

  // Feature and attach icons for advanced input
  const featureIcons = [
    { icon: "palette", label: "Travel Themes", onClick: () => alert("Travel Themes") },
    { icon: "map", label: "Map", onClick: () => alert("Show Map") },
    { icon: "language", label: "Languages", onClick: () => alert("Show Languages") },
    { icon: "cloud-sun", label: "Weather", onClick: () => alert("Show Weather") },
  ];
  const attachIcons = [
    { icon: "microphone", label: "Voice Input", onClick: () => alert("Voice Input") },
    { icon: "paperclip", label: "Attach File", onClick: () => alert("Attach File") },
    { icon: "money-bill-wave", label: "Currency", onClick: () => alert("Currency Converter") },
  ];
  return (
    <React.Fragment>
      {/* Welcome card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-4 text-center card-hover">
        <div className="globe-float inline-block mb-4">
          <i className="fas fa-globe text-6xl text-blue-500"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to World Explorer!</h2>
        <p className="text-gray-600 mb-4">I'm your virtual travel guide. Ask me about destinations, cultures, landmarks, or travel tips!</p>
        <div className="flex flex-wrap justify-center gap-2">
          {quickSuggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => sendQuickQuestion(s.text)}
              className="suggestion-chip bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm hover:bg-blue-200 transition flex items-center"
            >
              <i className={`fas fa-${s.icon} mr-1`}></i> {s.text}
            </button>
          ))}
        </div>
      </div>
      {/* Chat messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-4 rounded-lg ${msg.isUser ? "bg-blue-600 text-white rounded-br-none" : "bg-white shadow-md rounded-bl-none"}`}>
              {msg.isUser ? (
                <p>{msg.content}</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: msg.content }} />
              )}
            </div>
          </div>
        ))}
        {typingIndicator && (
          <div className="flex justify-start animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2 mt-1">
              <i className="fas fa-globe-americas text-white text-sm"></i>
            </div>
            <div className="max-w-[80%] p-4 rounded-lg bg-white shadow-md rounded-bl-none">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Enhanced input area with special features */}
      <div className="bg-white rounded-xl shadow-lg p-4 sticky bottom-4">
        <div className="flex items-center mb-2">
          <div className="flex space-x-1">
            {featureIcons.map((f, idx) => (
              <button
                key={f.icon}
                onClick={f.onClick}
                className="text-gray-500 hover:text-blue-500 p-2 rounded-full hover:bg-blue-50 transition"
                title={f.label}
              >
                <i className={`fas fa-${f.icon}`}></i>
              </button>
            ))}
          </div>
          <div className="ml-auto flex space-x-1">
            {attachIcons.map((f, idx) => (
              <button
                key={f.icon}
                onClick={f.onClick}
                className="text-gray-500 hover:text-blue-500 p-2 rounded-full hover:bg-blue-50 transition"
                title={f.label}
              >
                <i className={`fas fa-${f.icon}`}></i>
              </button>
            ))}
          </div>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Ask about any destination or travel topic..."
            className="flex-1 border border-gray-300 rounded-l-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 rounded-r-full hover:bg-blue-700 transition flex items-center"
          >
            <span>Send</span>
            <i className="fas fa-paper-plane ml-2"></i>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Chat;
