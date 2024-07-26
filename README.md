# Vidoozle - Video Conferencing and Virtual Partner Application

Vidoozle is an innovative web application designed to enhance social interaction through two unique features: **Video Conferencing** and a **Virtual Partner** experience. This project connects users randomly for video calls and provides an AI-driven virtual companion, making it a fun and engaging platform for meaningful conversations.

## Table of Contents

- [Features](#features)
  - [Video Conferencing](#video-conferencing)
  - [Virtual Partner](#virtual-partner)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

### Video Conferencing
- **Random Pairing**: Users are paired randomly for immersive video calls, similar to platforms like Omegle.
- **Real-time Communication**: Utilizes WebRTC technology for seamless video and audio streaming.
- **User-friendly Interface**: Intuitive and responsive design created with React.js and styled with Tailwind CSS.
- **Secure and Private**: Ensures a safe environment for users during video interactions.

### Virtual Partner
- **AI Companion**: Users can interact with a virtual persona modeled after loved ones or partners.
- **Voice Cloning**: Advanced voice cloning technology allows users to converse with a virtual representation of someone significant to them, enabling emotional support and companionship.
- **Personalized Experience**: The AI is designed to engage in deep conversations, sharing emotions and providing comfort.

## Technologies Used
- **Frontend**: 
  - React.js for building the user interface.
  - Tailwind CSS for responsive styling and design.
- **Backend**: 
  - Node.js for server-side logic and API management.
  - Express.js for handling API requests.
- **Real-time Communication**: 
  - WebRTC for video and audio streaming.
- **Voice Cloning**: 
  - Integration of AI technologies for generating realistic voice interactions.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/vidoozle.git
Navigate to the project directory:


```cd vidoozle```
Install the dependencies:
```cd frontend```


``` npm install```

- Create a .env file in the root directory and add your API keys:

VITE_APP_VAPI_KEY=your_key
VITE_PLAY_HT_AUTH=your_key
VITE_PLAY_HT_USERID=your_key
- you can get your key from vapi and playht 

Start the development server:

```npm run dev```
Open your browser and navigate to http://localhost:3000 (or the port specified in your terminal).

Usage
Upon visiting the landing page, users will be presented with two options:

Join Video Conference: Click this to enter the video conferencing feature, where users are paired randomly for video calls.
Virtual Partner: Click this to engage with the AI-driven virtual partner, where users can interact with a cloned voice of their loved ones or a fictional character.


## For BACKEND 


``` cd backend ```


For locally running socket.io we have a differnt script in the frontend room1.tsx beacuse of some issue with web socket connection establishment locally so,
manually update in the components/Landing.tsx to use room1.tsx instead of room.tsx(which is for cloud hosting)(The issue was in client connction to local server).


```npm run dev```


Here you go Backend Node server also started locally you can access that on http://localhost:3000 
