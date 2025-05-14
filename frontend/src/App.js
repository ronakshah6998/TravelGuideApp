import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  // Chat state management
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quickSuggestions, setQuickSuggestions] = useState([]);
  const chatContainerRef = useRef(null);
  
  // Enhanced travel knowledge base with richer responses
  const travelKnowledge = {
    "best beaches in asia": `
      <div class="mb-4">
        <h3 class="font-semibold text-lg mb-2">Top Beaches in Asia</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="destination-card" style="background-image: url('https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')">
            <div class="destination-card-content">
              <div class="font-medium">White Beach</div>
              <div class="text-xs">Boracay, Philippines</div>
            </div>
          </div>
          <div class="destination-card" style="background-image: url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')">
            <div class="destination-card-content">
              <div class="font-medium">Railay Beach</div>
              <div class="text-xs">Krabi, Thailand</div>
            </div>
          </div>
        </div>
        <div class="travel-tip p-3 rounded mb-3">
          <i class="fas fa-lightbulb text-blue-500 mr-2"></i> <b>Pro Tip:</b> Visit between November-April for the best weather conditions.
        </div>
        <p>Would you like more details about any of these beaches or information about beach resorts?</p>
      </div>
    `,
    "cultural festivals": `
      <div class="mb-4">
        <h3 class="font-semibold text-lg mb-2">Must-Experience Cultural Festivals</h3>
        <div class="space-y-3">
          <div class="flex items-start">
            <div class="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">
              <i class="fas fa-mask"></i>
            </div>
            <div>
              <h4 class="font-medium">Rio Carnival, Brazil</h4>
              <p class="text-sm text-gray-600">February/March - The world's biggest carnival with samba parades and vibrant costumes.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="bg-yellow-100 text-yellow-800 p-2 rounded-full mr-3">
              <i class="fas fa-paint-brush"></i>
            </div>
            <div>
              <h4 class="font-medium">Holi, India</h4>
              <p class="text-sm text-gray-600">March - Festival of colors celebrating the arrival of spring.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="bg-green-100 text-green-800 p-2 rounded-full mr-3">
              <i class="fas fa-beer"></i>
            </div>
            <div>
              <h4 class="font-medium">Oktoberfest, Germany</h4>
              <p class="text-sm text-gray-600">September/October - World's largest beer festival in Munich.</p>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <p>Which festival interests you most? I can provide dates, locations, and travel tips for each.</p>
        </div>
      </div>
    `,
    "budget travel tips": `
      <div class="mb-4">
        <h3 class="font-semibold text-lg mb-2">Smart Budget Travel Tips</h3>
        <div class="space-y-3">
          <div class="flex items-start">
            <div class="text-green-500 mr-3">
              <i class="fas fa-check-circle"></i>
            </div>
            <div>
              <h4 class="font-medium">Travel Off-Season</h4>
              <p class="text-sm text-gray-600">Prices drop significantly when you avoid peak travel times.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="text-green-500 mr-3">
              <i class="fas fa-check-circle"></i>
            </div>
            <div>
              <h4 class="font-medium">Use Budget Airlines</h4>
              <p class="text-sm text-gray-600">But watch for hidden fees on baggage and seat selection.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="text-green-500 mr-3">
              <i class="fas fa-check-circle"></i>
            </div>
            <div>
              <h4 class="font-medium">Eat Like a Local</h4>
              <p class="text-sm text-gray-600">Street food is often delicious and much cheaper than restaurants.</p>
            </div>
          </div>
        </div>
        <div class="mt-4 bg-blue-50 p-3 rounded-lg">
          <h4 class="font-medium flex items-center"><i class="fas fa-calculator text-blue-500 mr-2"></i> Budget Calculator</h4>
          <p class="text-sm mt-1">I can help estimate daily costs for your destination. Where are you planning to go?</p>
        </div>
      </div>
    `
  };

  // Enhanced sample responses for unknown queries
  const genericResponses = [
    `<div class="flex items-start">
      <div class="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">
        <i class="fas fa-binoculars"></i>
      </div>
      <div>
        <p>I'd be happy to help you explore that destination! While I gather more information, would you like to see pictures or learn about the best time to visit?</p>
      </div>
    </div>`,
    `<div class="flex items-start">
      <div class="bg-purple-100 text-purple-800 p-2 rounded-full mr-3">
        <i class="fas fa-landmark"></i>
      </div>
      <div>
        <p>That's an interesting question about world travel! I can provide you with cultural insights, must-see attractions, and practical travel tips for that location.</p>
      </div>
    </div>`,
    `<div class="flex items-start">
      <div class="bg-green-100 text-green-800 p-2 rounded-full mr-3">
        <i class="fas fa-suitcase-rolling"></i>
      </div>
      <div>
        <p>Great travel question! Let me share some fascinating facts and essential information about that place to help you plan your adventure.</p>
      </div>
    </div>`
  ];

  // Enhanced quick suggestions based on input
  const suggestionsMap = {
    "beach": [
      {text: "Best time to visit", icon: "calendar-alt"},
      {text: "Family-friendly options", icon: "children"},
      {text: "Snorkeling spots", icon: "water"}
    ],
    "festival": [
      {text: "Dates for next year", icon: "calendar-check"},
      {text: "What to wear", icon: "tshirt"},
      {text: "Local customs", icon: "hands-helping"}
    ],
    "budget": [
      {text: "Daily cost estimate", icon: "calculator"},
      {text: "Free attractions", icon: "money-bill-wave"},
      {text: "Cheap eats", icon: "hamburger"}
    ]
  };

  // Add a message to the chat
  const addMessage = (content, isUser = false) => {
    const newMessage = {
      id: Date.now(),
      content,
      isUser
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Scroll to bottom of chat
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  // Process user message and generate response
  const processUserMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    let response = '';
    
    // Show typing indicator
    setIsTyping(true);
    
    // Check if we have a specific response
    for (const key in travelKnowledge) {
      if (lowerMessage.includes(key)) {
        response = travelKnowledge[key];
        break;
      }
    }
    
    // If no specific response, use a generic one
    if (!response) {
      const randomIndex = Math.floor(Math.random() * genericResponses.length);
      response = genericResponses[randomIndex];
    }
    
    // Show typing indicator for 1-2 seconds before responding
    const delay = 1000 + Math.random() * 1000; // 1-2 seconds
    
    setTimeout(() => {
      setIsTyping(false);
      addMessage(response);
      
      // Show quick follow-up suggestions
      showFollowUpSuggestions(lowerMessage);
    }, delay);
  };

  // Show follow-up suggestions based on message
  const showFollowUpSuggestions = (message) => {
    let suggestions = [];
    
    if (message.includes('beach')) {
      suggestions = suggestionsMap.beach;
    } else if (message.includes('festival')) {
      suggestions = suggestionsMap.festival;
    } else if (message.includes('budget')) {
      suggestions = suggestionsMap.budget;
    } else {
      setQuickSuggestions([]);
      return;
    }
    
    setQuickSuggestions(suggestions);
  };

  // Send message from input
  const sendMessage = () => {
    if (inputValue.trim()) {
      addMessage(inputValue, true);
      processUserMessage(inputValue);
      setInputValue('');
      setQuickSuggestions([]);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  // Handle quick question buttons
  const sendQuickQuestion = (text) => {
    addMessage(text, true);
    processUserMessage(text);
    setQuickSuggestions([]);
  };

  // Initial welcome message
  useEffect(() => {
    setTimeout(() => {
      addMessage(`
        <div class="flex items-start">
          <div class="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">
            <i class="fas fa-globe-americas"></i>
          </div>
          <div>
            <p>Hello fellow traveler! 🌍 I'm your World Explorer assistant, here to help you discover amazing places, plan your trips, and learn about different cultures.</p>
            <p class="mt-2">Where would you like to explore today?</p>
          </div>
        </div>
      `);
    }, 1000);
  }, []);

  return (
    <div className="App bg-white min-h-screen">
      {/* World Explorer HTML Structure */}
      <div className="flex flex-col h-screen bg-white">
        {/* Header - Updated to match the design in the second image */}
        <header className="bg-blue-900 text-white p-3 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <div className="relative mr-2">
                        <i className="fas fa-globe-americas text-2xl text-blue-300"></i>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <h1 className="text-xl font-bold">World Explorer <span className="text-xs font-normal bg-blue-800 px-2 py-0.5 rounded-full ml-2">PRO</span></h1>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium hover:bg-opacity-30 transition flex items-center text-sm">
                        <i className="fas fa-passport mr-1.5"></i>My Travels
                        <span className="ml-1.5 bg-yellow-400 text-blue-900 text-xs px-1.5 py-0.5 rounded-full">3</span>
                    </button>
                    <button className="bg-white text-blue-700 px-3 py-1.5 rounded-full font-medium hover:bg-blue-50 transition flex items-center text-sm">
                        <i className="fas fa-map-marked-alt mr-1.5"></i>Discover
                    </button>
                    <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer">
                        <i className="fas fa-user text-white text-sm"></i>
                    </div>
                </div>
            </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar - Updated to match the design in the second image */}
            <div id="sidebar" className="hidden md:block w-64 bg-white shadow-md overflow-y-auto border-r border-gray-100">
                <div className="p-3">
                    <div className="mb-5">
                        <div className="flex items-center mb-2">
                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                <i className="fas fa-compass text-blue-500 text-xs"></i>
                            </div>
                            <h3 className="text-sm font-medium text-gray-700">Travel Tools</h3>
                        </div>
                        <ul className="space-y-1.5">
                            <li className="flex items-center p-1.5 rounded-md hover:bg-blue-50 cursor-pointer text-sm">
                                <i className="fas fa-plane mr-2.5 text-blue-500"></i>
                                <span>Flight Finder</span>
                            </li>
                            <li className="flex items-center p-1.5 rounded-md hover:bg-blue-50 cursor-pointer text-sm">
                                <i className="fas fa-hotel mr-2.5 text-blue-500"></i>
                                <span>Hotel Search</span>
                            </li>
                            <li className="flex items-center p-1.5 rounded-md hover:bg-blue-50 cursor-pointer text-sm">
                                <i className="fas fa-utensils mr-2.5 text-blue-500"></i>
                                <span>Local Cuisine</span>
                            </li>
                            <li className="flex items-center p-1.5 rounded-md hover:bg-blue-50 cursor-pointer text-sm">
                                <i className="fas fa-calendar-alt mr-2.5 text-blue-500"></i>
                                <span>Event Calendar</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="mb-5">
                        <div className="flex items-center mb-2">
                            <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                                <i className="fas fa-fire text-orange-500 text-xs"></i>
                            </div>
                            <h3 className="text-sm font-medium text-gray-700">Trending</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="destination-card" style={{backgroundImage: "url('https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')", height: "70px"}}>                                <div className="destination-card-content">
                                    <div className="font-medium text-xs">Bali</div>
                                    <div className="text-xs opacity-80">Indonesia</div>
                                </div>
                            </div>
                            <div className="destination-card" style={{backgroundImage: "url('https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')", height: "70px"}}>                                <div className="destination-card-content">
                                    <div className="font-medium text-xs">Kyoto</div>
                                    <div className="text-xs opacity-80">Japan</div>
                                </div>
                            </div>
                            <div className="destination-card" style={{backgroundImage: "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')", height: "70px"}}>                                <div className="destination-card-content">
                                    <div className="font-medium text-xs">Santorini</div>
                                    <div className="text-xs opacity-80">Greece</div>
                                </div>
                            </div>
                            <div className="destination-card" style={{backgroundImage: "url('https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')", height: "70px"}}>                                <div className="destination-card-content">
                                    <div className="font-medium text-xs">Patagonia</div>
                                    <div className="text-xs opacity-80">Chile</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="weather-widget p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <div className="flex items-center justify-between mb-1.5">
                            <div>
                                <div className="font-medium text-sm">Current Location</div>
                                <div className="text-xs opacity-90">New York, USA</div>
                            </div>
                            <div className="text-2xl">72°F</div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center">
                                <i className="fas fa-cloud-sun mr-1"></i>
                                <span>Partly Cloudy</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-wind mr-1"></i>
                                <span>8 mph</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main chat area - Updated to match the design in the second image */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
                {/* Welcome card with globe animation */}
                <div className="p-4">
                <div className="bg-white rounded-xl shadow-md p-6 mb-4 text-center card-hover">
                    <div className="globe-float inline-block mb-4">
                        <i className="fas fa-globe text-6xl text-blue-500"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to World Explorer!</h2>
                    <p className="text-gray-600 mb-4">I'm your virtual travel guide. Ask me about destinations, cultures, landmarks, or travel tips!</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <button 
                            onClick={() => sendQuickQuestion("Best beaches in the world")}
                            className="suggestion-chip bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm hover:bg-blue-200 transition flex items-center"
                        >
                            <i className="fas fa-umbrella-beach mr-1"></i> Best beaches
                        </button>
                        <button 
                            onClick={() => sendQuickQuestion("Famous landmarks to visit")}
                            className="suggestion-chip bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm hover:bg-blue-200 transition flex items-center"
                        >
                            <i className="fas fa-monument mr-1"></i> Landmarks
                        </button>
                        <button 
                            onClick={() => sendQuickQuestion("Budget travel tips")}
                            className="suggestion-chip bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm hover:bg-blue-200 transition flex items-center"
                        >
                            <i className="fas fa-wallet mr-1"></i> Budget tips
                        </button>
                        <button 
                            onClick={() => sendQuickQuestion("Travel itineraries suggestions")}
                            className="suggestion-chip bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm hover:bg-blue-200 transition flex items-center"
                        >
                            <i className="fas fa-route mr-1"></i> Itineraries
                        </button>
                    </div>
                </div>
                </div>

                {/* Chat messages container */}
                <div id="chat-container" ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 space-y-3">
                    {/* Render chat messages */}
                    {messages.map(message => (
                        <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'items-start'} mb-3 message-enter`}>
                            {!message.isUser && (
                                <div className="mr-2 mt-0.5">
                                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                                        <i className="fas fa-globe-americas text-blue-500 text-sm"></i>
                                    </div>
                                </div>
                            )}
                            <div>
                                {!message.isUser && (
                                    <div className="flex items-center">
                                        <span className="font-medium text-xs">World Explorer</span>
                                        <span className="ml-1.5 text-xs text-gray-400">Just now</span>
                                    </div>
                                )}
                                <div className={`${message.isUser ? 'bg-blue-600 text-white' : 'bg-white'} rounded-lg ${message.isUser ? 'p-2.5' : 'p-2.5 mt-1 border border-gray-100'} ${message.isUser ? 'max-w-xs md:max-w-md' : ''} shadow-sm card-hover`}>
                                    <div 
                                        className="text-sm"
                                        dangerouslySetInnerHTML={{ __html: message.content }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="flex items-start mb-3">
                            <div className="mr-2 mt-0.5">
                                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                                    <i className="fas fa-globe-americas text-blue-500 text-sm"></i>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <span className="font-medium text-xs">World Explorer</span>
                                    <span className="ml-1.5 text-xs text-gray-400">Typing</span>
                                </div>
                                <div className="bg-white rounded-lg p-2.5 mt-1 shadow-sm border border-gray-100">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Enhanced input area with special features */}
                <div className="px-4 pb-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-1.5 sticky bottom-4">
                        <div className="flex items-center mb-1.5">
                            <div className="flex space-x-1">
                                <button 
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition text-xs" 
                                    title="Images"
                                >
                                    <i className="fas fa-image"></i>
                                </button>
                                <button 
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition text-xs" 
                                    title="Map"
                                >
                                    <i className="fas fa-map"></i>
                                </button>
                                <button 
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition text-xs" 
                                    title="Languages"
                                >
                                    <i className="fas fa-language"></i>
                                </button>
                            </div>
                            <div className="ml-auto flex space-x-1">
                                <button 
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition text-xs" 
                                    title="Voice Input"
                                >
                                    <i className="fas fa-microphone"></i>
                                </button>
                                <button 
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition text-xs" 
                                    title="Attach File"
                                >
                                    <i className="fas fa-paperclip"></i>
                                </button>
                            </div>
                        </div>
                        <div className="flex">
                            <input 
                                id="message-input" 
                                type="text" 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about any destination or travel topic..." 
                                className="flex-1 border border-gray-200 rounded-l-full py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                            />
                            <button 
                                onClick={sendMessage}
                                className="bg-blue-600 text-white px-3 py-1.5 rounded-r-full hover:bg-blue-700 transition flex items-center"
                            >
                                <i className="fas fa-paper-plane text-xs"></i>
                            </button>
                        </div>
                        
                        {/* Quick suggestions */}
                        {quickSuggestions.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {quickSuggestions.map((suggestion, index) => (
                                    <button 
                                        key={index}
                                        onClick={() => sendQuickQuestion(suggestion.text)}
                                        className="suggestion-chip bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs hover:bg-gray-200 transition flex items-center"
                                    >
                                        <i className={`fas fa-${suggestion.icon} mr-1`}></i> {suggestion.text}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
