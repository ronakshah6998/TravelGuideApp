import React from "react";

const Sidebar = () => (
  <aside className="w-64 bg-white p-4 hidden md:block border-r border-gray-200">
    <div className="mb-6">
      <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
        <i className="fas fa-compass mr-2 text-blue-500"></i> Travel Tools
      </h3>
      <ul className="space-y-2">
        <li className="flex items-center p-2 rounded-lg hover:bg-blue-50 cursor-pointer">
          <i className="fas fa-plane mr-3 text-blue-500"></i>
          <span>Flight Finder</span>
        </li>
        <li className="flex items-center p-2 rounded-lg hover:bg-blue-50 cursor-pointer">
          <i className="fas fa-hotel mr-3 text-blue-500"></i>
          <span>Hotel Search</span>
        </li>
        <li className="flex items-center p-2 rounded-lg hover:bg-blue-50 cursor-pointer">
          <i className="fas fa-utensils mr-3 text-blue-500"></i>
          <span>Local Cuisine</span>
        </li>
        <li className="flex items-center p-2 rounded-lg hover:bg-blue-50 cursor-pointer">
          <i className="fas fa-calendar-alt mr-3 text-blue-500"></i>
          <span>Event Calendar</span>
        </li>
      </ul>
    </div>
    <div className="mb-6">
      <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
        <i className="fas fa-fire mr-2 text-orange-500"></i> Trending
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="destination-card" style={{backgroundImage: "url('https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"}}>
          <div className="destination-card-content">
            <div className="font-medium text-sm">Bali</div>
            <div className="text-xs">Indonesia</div>
          </div>
        </div>
        <div className="destination-card" style={{backgroundImage: "url('https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"}}>
          <div className="destination-card-content">
            <div className="font-medium text-sm">Kyoto</div>
            <div className="text-xs">Japan</div>
          </div>
        </div>
        <div className="destination-card" style={{backgroundImage: "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"}}>
          <div className="destination-card-content">
            <div className="font-medium text-sm">Santorini</div>
            <div className="text-xs">Greece</div>
          </div>
        </div>
        <div className="destination-card" style={{backgroundImage: "url('https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"}}>
          <div className="destination-card-content">
            <div className="font-medium text-sm">Patagonia</div>
            <div className="text-xs">Chile</div>
          </div>
        </div>
      </div>
    </div>
    <div className="weather-widget p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="font-medium">Current Location</div>
          <div className="text-sm opacity-90">New York, USA</div>
        </div>
        <div className="text-3xl">72°F</div>
      </div>
      <div className="flex items-center justify-between text-sm">
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
  </aside>
);

export default Sidebar;
