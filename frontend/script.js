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
const quickSuggestions = {
    "beach": [
        {text: "Best time to visit", icon: "calendar-alt"},
        {text: "Family-friendly options", icon: "children"},
        {text: "Snorkeling spots", icon: "water"},
        {text: "Luxury resorts", icon: "umbrella-beach"},
        {text: "Local cuisine", icon: "utensils"}
    ],
    "festival": [
        {text: "Dates for next year", icon: "calendar-check"},
        {text: "What to wear", icon: "tshirt"},
        {text: "Local customs", icon: "hands-helping"},
        {text: "Photography tips", icon: "camera"},
        {text: "Nearby hotels", icon: "hotel"}
    ],
    "budget": [
        {text: "Daily cost estimate", icon: "calculator"},
        {text: "Free attractions", icon: "money-bill-wave"},
        {text: "Cheap eats", icon: "hamburger"},
        {text: "Transportation tips", icon: "bus"},
        {text: "Discount cards", icon: "id-card"}
    ],
    "europe": [
        {text: "Visa requirements", icon: "passport"},
        {text: "Best train routes", icon: "train"},
        {text: "Seasonal highlights", icon: "snowflake"},
        {text: "Language tips", icon: "language"},
        {text: "Cultural etiquette", icon: "handshake"}
    ]
};

// Add a message to the chat
function addMessage(content, isUser = false) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    
    messageDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`;
    messageDiv.innerHTML = `
        <div class="${isUser ? 'bg-blue-600 text-white' : 'bg-white'} rounded-2xl p-4 max-w-xs md:max-w-md lg:max-w-lg shadow-lg message-enter card-hover" style="word-wrap: break-word;">
            ${isUser ? content : `
                <div class="flex items-center mb-2">
                    <div class="relative">
                        <i class="fas fa-globe-americas mr-2 text-blue-500"></i>
                        <div class="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <span class="font-semibold">World Explorer</span>
                    <span class="ml-2 text-xs text-gray-500">Just now</span>
                </div>
                ${content}
            `}
        </div>
    `;
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const chatContainer = document.getElementById('chat-container');
    const typingDiv = document.createElement('div');
    
    typingDiv.className = 'flex justify-start';
    typingDiv.innerHTML = `
        <div class="bg-white rounded-2xl p-4 shadow-lg message-enter card-hover">
            <div class="flex items-center">
                <div class="relative">
                    <i class="fas fa-globe-americas mr-2 text-blue-500"></i>
                    <div class="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <span class="font-semibold mr-2">World Explorer</span>
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;
    
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return typingDiv;
}

// Remove typing indicator
function removeTypingIndicator(typingElement) {
    if (typingElement) {
        typingElement.remove();
    }
}

// Process user message and generate response
function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    let response = '';
    
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
    
    // Show typing indicator for 1-3 seconds before responding
    const typingElement = showTypingIndicator();
    const delay = 1000 + Math.random() * 2000; // 1-3 seconds
    
    setTimeout(() => {
        removeTypingIndicator(typingElement);
        addMessage(response);
        
        // Show quick follow-up suggestions
        showFollowUpSuggestions(lowerMessage);
    }, delay);
}

// Show follow-up suggestions based on message
function showFollowUpSuggestions(message) {
    const suggestionsContainer = document.getElementById('quick-suggestions');
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.classList.remove('hidden');
    
    let suggestions = [];
    
    if (message.includes('beach')) {
        suggestions = quickSuggestions.beach;
    } else if (message.includes('festival')) {
        suggestions = quickSuggestions.festival;
    } else if (message.includes('budget')) {
        suggestions = quickSuggestions.budget;
    } else if (message.includes('europe')) {
        suggestions = quickSuggestions.europe;
    } else {
        suggestionsContainer.classList.add('hidden');
        return;
    }
    
    suggestions.forEach(suggestion => {
        const button = document.createElement('button');
        button.className = 'suggestion-chip bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition flex items-center';
        button.innerHTML = `<i class="fas fa-${suggestion.icon} mr-1"></i> ${suggestion.text}`;
        button.onclick = function() {
            sendQuickQuestion(this);
        };
        suggestionsContainer.appendChild(button);
    });
}

// Send message from input
function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, true);
        input.value = '';
        processUserMessage(message);
    }
}

// Handle quick question buttons
function sendQuickQuestion(button) {
    const message = button.textContent || button.innerText;
    addMessage(message, true);
    processUserMessage(message);
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Enhanced feature placeholders
function showTravelThemes() {
    addMessage("Travel themes selected: Adventure, Cultural, Relaxation", true);
    setTimeout(() => {
        const typingElement = showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator(typingElement);
            addMessage(`
                <div class="flex items-start">
                    <div class="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">
                        <i class="fas fa-palette"></i>
                    </div>
                    <div>
                        <h4 class="font-medium mb-2">Themes Selected: Adventure, Cultural, Relaxation</h4>
                        <div class="grid grid-cols-3 gap-2 mb-2">
                            <div class="bg-blue-50 p-2 rounded text-center">
                                <i class="fas fa-hiking text-blue-500 mb-1"></i>
                                <div class="text-xs">Adventure</div>
                            </div>
                            <div class="bg-purple-50 p-2 rounded text-center">
                                <i class="fas fa-landmark text-purple-500 mb-1"></i>
                                <div class="text-xs">Cultural</div>
                            </div>
                            <div class="bg-green-50 p-2 rounded text-center">
                                <i class="fas fa-spa text-green-500 mb-1"></i>
                                <div class="text-xs">Relaxation</div>
                            </div>
                        </div>
                        <p>I'll tailor my recommendations to include adventurous activities, cultural experiences, and relaxing spots. Where would you like to go?</p>
                    </div>
                </div>
            `);
        }, 1500);
    }, 500);
}

function showMap() {
    addMessage("Show me the map", true);
    setTimeout(() => {
        const typingElement = showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator(typingElement);
            addMessage(`
                <div>
                    <h4 class="font-medium mb-2">Interactive Travel Maps</h4>
                    <div class="map-container mb-3">
                        <!-- Map would be displayed here -->
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <button class="bg-blue-50 text-blue-700 p-2 rounded flex items-center justify-center">
                            <i class="fas fa-landmark mr-2"></i> Attractions
                        </button>
                        <button class="bg-green-50 text-green-700 p-2 rounded flex items-center justify-center">
                            <i class="fas fa-utensils mr-2"></i> Food
                        </button>
                        <button class="bg-yellow-50 text-yellow-700 p-2 rounded flex items-center justify-center">
                            <i class="fas fa-subway mr-2"></i> Transport
                        </button>
                        <button class="bg-purple-50 text-purple-700 p-2 rounded flex items-center justify-center">
                            <i class="fas fa-camera mr-2"></i> Scenic
                        </button>
                    </div>
                </div>
            `);
        }, 1500);
    }, 500);
}

function showLanguageOptions() {
    addMessage("Language options", true);
    setTimeout(() => {
        const typingElement = showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator(typingElement);
            addMessage(`
                <div>
                    <h4 class="font-medium mb-2">Travel Phrases in Different Languages</h4>
                    <div class="space-y-2">
                        <div class="language-option p-2 rounded cursor-pointer flex items-center">
                            <span class="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3">
                                <i class="fas fa-language"></i>
                            </span>
                            <div>
                                <div class="font-medium">Spanish</div>
                                <div class="text-xs text-gray-500">Learn essential phrases</div>
                            </div>
                        </div>
                        <div class="language-option p-2 rounded cursor-pointer flex items-center">
                            <span class="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center mr-3">
                                <i class="fas fa-language"></i>
                            </span>
                            <div>
                                <div class="font-medium">French</div>
                                <div class="text-xs text-gray-500">Learn essential phrases</div>
                            </div>
                        </div>
                        <div class="language-option p-2 rounded cursor-pointer flex items-center">
                            <span class="w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center mr-3">
                                <i class="fas fa-language"></i>
                            </span>
                            <div>
                                <div class="font-medium">Mandarin</div>
                                <div class="text-xs text-gray-500">Learn essential phrases</div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p>Which language would you like to learn travel phrases for?</p>
                    </div>
                </div>
            `);
        }, 1500);
    }, 500);
}

function showWeather() {
    addMessage("Show weather information", true);
    setTimeout(() => {
        const typingElement = showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator(typingElement);
            addMessage(`
                <div class="weather-widget p-4">
                    <div class="flex items-center justify-between mb-2">
                        <div>
                            <div class="font-medium">Current Weather</div>
                            <div class="text-sm opacity-90">Paris, France</div>
                        </div>
                        <div class="text-3xl">64°F</div>
                    </div>
                    <div class="flex items-center justify-between text-sm mb-3">
                        <div class="flex items-center">
                            <i class="fas fa-cloud-rain mr-1"></i>
                            <span>Light Rain</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-wind mr-1"></i>
                            <span>5 mph</span>
                        </div>
                    </div>
                    <div class="flex justify-between text-xs">
                        <div class="text-center">
                            <div>Mon</div>
                            <i class="fas fa-cloud-sun my-1"></i>
                            <div>68°F</div>
                        </div>
                        <div class="text-center">
                            <div>Tue</div>
                            <i class="fas fa-sun my-1"></i>
                            <div>72°F</div>
                        </div>
                        <div class="text-center">
                            <div>Wed</div>
                            <i class="fas fa-cloud-showers-heavy my-1"></i>
                            <div>65°F</div>
                        </div>
                        <div class="text-center">
                            <div>Thu</div>
                            <i class="fas fa-cloud my-1"></i>
                            <div>70°F</div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p>Would you like weather information for a different location?</p>
                    </div>
                </div>
            `);
        }, 1500);
    }, 500);
}

function showCurrencyConverter() {
    addMessage("Show currency converter", true);
    setTimeout(() => {
        const typingElement = showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator(typingElement);
            addMessage(`
                <div>
                    <h4 class="font-medium mb-2">Currency Converter</h4>
                    <div class="bg-gray-50 p-3 rounded-lg mb-3">
                        <div class="grid grid-cols-5 gap-2 items-center mb-2">
                            <input type="number" value="100" class="col-span-2 border rounded p-2">
                            <div class="text-center">
                                <i class="fas fa-exchange-alt text-gray-500"></i>
                            </div>
                            <input type="number" value="85.50" class="col-span-2 border rounded p-2">
                        </div>
                        <div class="grid grid-cols-5 gap-2">
                            <select class="col-span-2 border rounded p-2 text-sm">
                                <option>USD</option>
                                <option>EUR</option>
                                <option>GBP</option>
                            </select>
                            <div></div>
                            <select class="col-span-2 border rounded p-2 text-sm">
                                <option>EUR</option>
                                <option>USD</option>
                                <option>GBP</option>
                            </select>
                        </div>
                    </div>
                    <p>I can provide current exchange rates and money-saving tips for your destination. Where are you traveling?</p>
                </div>
            `);
        }, 1500);
    }, 500);
}

function showVoiceInput() {
    addMessage("Voice input activated", true);
    setTimeout(() => {
        const typingElement = showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator(typingElement);
            addMessage(`
                <div class="flex items-start">
                    <div class="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">
                        <i class="fas fa-microphone"></i>
                    </div>
                    <div>
                        <p>I'm listening! Please ask your travel question. For example:</p>
                        <ul class="list-disc list-inside text-sm mt-1 ml-2">
                            <li>"What are the must-see places in Paris?"</li>
                            <li>"How do I say thank you in Italian?"</li>
                            <li>"What's the best time to visit Japan?"</li>
                        </ul>
                    </div>
                </div>
            `);
        }, 1500);
    }, 500);
}

function attachFile() {
    addMessage("File attached: travel_plan.pdf", true);
    setTimeout(() => {
        const typingElement = showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator(typingElement);
            addMessage(`
                <div class="flex items-start">
                    <div class="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <div>
                        <p>I've received your travel plan. I can help you:</p>
                        <ul class="list-disc list-inside text-sm mt-1 ml-2">
                            <li>Optimize your itinerary</li>
                            <li>Suggest alternative activities</li>
                            <li>Find the best times to visit each place</li>
                            <li>Recommend local guides and tours</li>
                        </ul>
                        <p class="mt-2">How would you like me to assist with your plan?</p>
                    </div>
                </div>
            `);
        }, 1500);
    }, 500);
}

// Initial welcome message
window.onload = function() {
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
};
