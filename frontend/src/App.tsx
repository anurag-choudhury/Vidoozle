
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from './components/Landing';
// import Voicecriber from "./components/voicecriber"
// import { VaApp } from './Va-App.jsx'
import Voicecriber from "./components-va/voice/voicecriber";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/va" element={< Voicecriber />} />
      </Routes>
    </BrowserRouter>
  )
}

// function App() {
//   <Voicecriber />
// }
export default App
