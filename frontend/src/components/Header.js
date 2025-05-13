import React from "react";

const Header = () => (
  <header className="gradient-bg text-white p-4 shadow-lg">
    <div className="container mx-auto flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <i className="fas fa-globe-americas text-3xl text-blue-300"></i>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-2xl font-bold">World Explorer <span className="text-xs font-normal bg-blue-800 px-2 py-1 rounded-full ml-2">PRO</span></h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full font-medium hover:bg-opacity-30 transition flex items-center">
          <i className="fas fa-passport mr-2"></i>My Travels
          <span className="ml-2 bg-yellow-400 text-blue-900 text-xs px-2 py-0.5 rounded-full">3</span>
        </button>
        <button className="bg-white text-blue-700 px-4 py-2 rounded-full font-semibold hover:bg-blue-50 transition flex items-center">
          <i className="fas fa-map-marked-alt mr-2"></i>Discover
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer">
          <i className="fas fa-user text-white"></i>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
