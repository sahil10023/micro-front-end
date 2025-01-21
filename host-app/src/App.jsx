import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import './App.css';

// Lazy load the ChatApp and EmailApp components
const ChatApp = lazy(() => import('chat_app/ChatApp'));
const EmailApp = lazy(() => import('email_app/EmailApp'));

function App() {
  const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;
  console.log(COHERE_API_KEY);
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/chatapp"
            element={
              <Suspense fallback={<div>Loading Chat...</div>}>
                <ChatApp apiKey={COHERE_API_KEY} />
              </Suspense>
            }
          />
          <Route
            path="/emailapp"
            element={
              <Suspense fallback={<div>Loading Email...</div>}>
                <EmailApp apiKey={COHERE_API_KEY} />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
