import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import CyberQuiz from "./components/CyberQuiz";
import ChatSimulation  from "./components/ChatSimulation"
import SmsPhishingSimulation from "./components/SmsPhishingSimulation";
import PasswordStrengthChecker from "./components/PasswordStrengthChecker"
import EmailPhishingSimulation from "./components/EmailPhishingSimulation"

function App() {
  return (
    // <div className="min-h-screen bg-gray-100 p-6">
   
    //   {/* <CyberQuiz /> */}

    //   <ChatSimulation />
    //  {/* < SmsPhishingSimulation />  */}


    // {/* < PasswordStrengthChecker /> */}
    // {/* <EmailPhishingSimulation /> */}
    // </div>

    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat-simulation" element={<ChatSimulation />} />
      <Route path="/email-phishing" element={<EmailPhishingSimulation />} />
      <Route path="/sms-phishing" element={<SmsPhishingSimulation />} />
      <Route path="/quiz" element={<CyberQuiz />} />
      <Route path="/password-checker" element={<PasswordStrengthChecker />} />
    </Routes>
  </Router>
  );
}

export default App;
