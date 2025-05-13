import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex container mx-auto max-w-7xl w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col p-0 md:p-4">
          <Chat />
        </main>
      </div>
    </div>
  );
}

export default App;
