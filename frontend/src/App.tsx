import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Voicecriber from "./components-va/voice/voicecriber"; // Assuming you have a Voicecriber component
// import VideoConference from './VideoConference'; // Assuming you have a VideoConference component
import { Landing } from './components/Landing';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <header className="flex flex-col items-center justify-center h-64 text-white">
        <h1 className="text-5xl font-bold">Welcome to Vidoozle</h1>
        <p className="mt-4 text-lg">Your gateway to meaningful connections!</p>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold text-purple-600">Video Conferencing</h2>
              <p className="mt-2 text-gray-700">Connect with random users for exciting video chats.</p>
              <Link
                to="/video-conference"
                className="mt-4 inline-block bg-purple-600 text-white py-2 px-4 rounded transition duration-300 hover:bg-purple-700"
              >
                Start Video Call
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold text-purple-600">Virtual Partner</h2>
              <p className="mt-2 text-gray-700">Engage with a virtual companion who understands you.</p>
              <Link
                to="/va"
                className="mt-4 inline-block bg-purple-600 text-white py-2 px-4 rounded transition duration-300 hover:bg-purple-700"
              >
                Meet Your Partner
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-4 bg-white text-center">
        <p className="text-gray-600">© 2024 Vidoozle. All rights reserved.</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/video-conference" element={<Landing />} />
        <Route path="/va" element={<Voicecriber />} />
      </Routes>
    </Router>
  );
};

export default App;
