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
    `,
    "hidden gems in europe": `
        <div class="mb-4">
            <h3 class="font-semibold text-lg mb-2">Underrated European Gems</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="destination-card" style="background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')">
                    <div class="destination-card-content">
                        <div class="font-medium">Kotor</div>
                        <div class="text-xs">Montenegro</div>
                    </div>
                </div>
                <div class="destination-card" style="background-image: url('https://images.unsplash.com/photo-1552832230-cb4974d9d0b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')">
                    <div class="destination-card-content">
                        <div class="font-medium">Hallstatt</div>
                        <div class="text-xs">Austria</div>
                    </div>
                </div>
            </div>
            <div class="map-container">
                <!-- Map would be displayed here -->
            </div>
            <div class="mt-3">
                <p>These destinations offer amazing experiences with fewer crowds than mainstream spots. Need recommendations for similar hidden gems?</p>
            </div>
        </div>
    `
};

// Core functionality for handling user interactions
document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator px-4 py-2 mb-4 flex items-center';
    typingIndicator.innerHTML = `
        <div class="flex space-x-1">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
        <div class="ml-2 text-sm text-gray-500">World Explorer is typing...</div>
    `;

    // Initialize with a welcome message
    setTimeout(() => {
        addMessage(`
            <div>
                <h3 class="font-semibold text-lg">Welcome to World Explorer!</h3>
                <p class="mb-3">I'm your travel companion, ready to help you discover amazing destinations and travel tips.</p>
                <p>You can ask me about:</p>
                <ul class="list-disc pl-5 space-y-1 mt-2">
                    <li>Popular destinations</li>
                    <li>Travel tips and advice</li>
                    <li>Cultural experiences</li>
                    <li>Budget travel ideas</li>
                </ul>
                <p class="mt-3">What would you like to explore today?</p>
            </div>
        `);
    }, 500);

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Function to send a message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, true);
            messageInput.value = '';
            showTypingIndicator();
            processUserMessage(message);
        }
    }

    // Function to add a message to the chat
    function addMessage(content, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${isUser ? 'user-message' : 'bot-message'} mb-4 ${isUser ? 'ml-auto' : ''}`;
        
        if (isUser) {
            messageElement.innerHTML = `
                <div class="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs md:max-w-md lg:max-w-lg">
                    ${content}
                </div>
                <div class="flex items-center mt-1">
                    <div class="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-2">
                        <i class="fas fa-user text-blue-500"></i>
                    </div>
                    <div class="text-xs text-gray-500">You</div>
                </div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="flex items-center mb-1">
                    <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <i class="fas fa-globe-americas text-green-500"></i>
                    </div>
                    <div class="text-xs text-gray-500">World Explorer</div>
                </div>
                <div class="bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm max-w-xs md:max-w-md lg:max-w-lg">
                    ${content}
                </div>
            `;
        }
        
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        chatContainer.appendChild(typingIndicator);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Function to hide typing indicator
    function hideTypingIndicator() {
        if (typingIndicator.parentNode === chatContainer) {
            chatContainer.removeChild(typingIndicator);
        }
    }

    // Process user message and generate response
    async function processUserMessage(message) {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Convert message to lowercase for easier matching
        const lowerMessage = message.toLowerCase();
        
        // Check for matches in our knowledge base
        let response = '';
        
        if (lowerMessage.includes('beach') || lowerMessage.includes('beaches') || lowerMessage.includes('asia')) {
            response = travelKnowledge["best beaches in asia"];
        } else if (lowerMessage.includes('festival') || lowerMessage.includes('cultural') || lowerMessage.includes('culture')) {
            response = travelKnowledge["cultural festivals"];
        } else if (lowerMessage.includes('budget') || lowerMessage.includes('cheap') || lowerMessage.includes('money') || lowerMessage.includes('cost')) {
            response = travelKnowledge["budget travel tips"];
        } else if (lowerMessage.includes('hidden') || lowerMessage.includes('gem') || lowerMessage.includes('europe') || lowerMessage.includes('underrated')) {
            response = travelKnowledge["hidden gems in europe"];
        } else {
            // Default response for unrecognized queries
            response = `
                <div>
                    <p>I'd be happy to help with that! Could you provide more details about what you're looking for?</p>
                    <div class="mt-3 grid grid-cols-2 gap-2">
                        <button class="suggestion-btn">Popular destinations</button>
                        <button class="suggestion-btn">Travel tips</button>
                        <button class="suggestion-btn">Cultural experiences</button>
                        <button class="suggestion-btn">Budget travel</button>
                    </div>
                </div>
            `;
        }
        
        hideTypingIndicator();
        addMessage(response);
        
        // Add event listeners to suggestion buttons
        setTimeout(() => {
            document.querySelectorAll('.suggestion-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    addMessage(btn.textContent, true);
                    showTypingIndicator();
                    processUserMessage(btn.textContent);
                });
            });
        }, 100);
    }

    // Set up event listeners for theme buttons
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            selectTravelTheme(btn.getAttribute('data-theme'));
        });
    });
    
    // Set up event listener for mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
    
    // Set up event listeners for destination cards
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('click', () => {
            const destination = card.querySelector('.destination-card-content .font-medium').textContent;
            handleDestinationCardClick(destination);
        });
    });
});

// Additional features and utility functions

// Function to handle travel theme selection
function selectTravelTheme(theme) {
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => btn.classList.remove('active-theme'));
    
    const selectedButton = document.querySelector(`.theme-btn[data-theme="${theme}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active-theme');
    }
    
    // Here we would update the UI based on the selected theme
    // For now, we'll just log it
    console.log(`Selected theme: ${theme}`);
}

// Function to toggle the sidebar on mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('sidebar-open');
}

// Function to handle map interactions
function initializeMap(containerId, location) {
    // This would integrate with a map API like Google Maps or Mapbox
    // For now, we'll just log it
    console.log(`Initializing map in ${containerId} for location: ${location}`);
    
    // Placeholder for map initialization
    const mapContainer = document.getElementById(containerId);
    if (mapContainer) {
        mapContainer.innerHTML = `<div class="bg-gray-200 p-4 rounded text-center">Map of ${location} would be displayed here</div>`;
    }
}

// Function to handle language selection
function changeLanguage(language) {
    // This would change the language of the interface
    // For now, we'll just log it
    console.log(`Changing language to: ${language}`);
    
    // Show a notification to the user
    showNotification(`Language changed to ${language}`);
}

// Function to show weather information
function showWeatherInfo(location) {
    // This would fetch weather data from an API
    // For now, we'll return mock data
    const weatherData = {
        location: location,
        temperature: Math.floor(Math.random() * 30) + 10, // Random temp between 10-40°C
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 50) + 30 // Random humidity between 30-80%
    };
    
    return `
        <div class="weather-widget p-3 bg-blue-50 rounded-lg">
            <h4 class="font-medium flex items-center">
                <i class="fas fa-cloud-sun text-blue-500 mr-2"></i> Weather in ${weatherData.location}
            </h4>
            <div class="flex items-center justify-between mt-2">
                <div class="text-2xl font-bold">${weatherData.temperature}°C</div>
                <div>${weatherData.condition}</div>
            </div>
            <div class="text-sm text-gray-600">Humidity: ${weatherData.humidity}%</div>
        </div>
    `;
}

// Function to show a notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Function to handle destination card clicks
function handleDestinationCardClick(destination) {
    // This would show more information about the destination
    // For now, we'll just log it
    console.log(`Showing more information about: ${destination}`);
    
    // We could add a message to the chat with more information
    const message = `Tell me more about ${destination}`;
    // This would trigger the message to be sent
    // For demonstration purposes, we'll just log it
    console.log(`User requested: ${message}`);
}
