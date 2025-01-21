import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto py-10 px-4 md:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Chat App Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 h-max flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Chat App</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Our AI-powered Chat App, integrated with Cohere AI, allows you to
              experience seamless and intelligent conversations. Whether you
              need assistance with quick queries or want to engage in real-time
              discussions, this app is designed to make communication simple and
              effective. Explore the future of AI-driven conversations!
            </p>
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium"
            onClick={() => navigate('/chatapp')}
          >
            Let me try
          </button>
        </div>

        {/* Email App Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 h-max flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Email App</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Create professional emails effortlessly with our advanced Email
              App, powered by Cohere AI. Just provide a simple prompt, and the
              AI will craft well-structured, polished emails tailored to your
              needs. Perfect for busy professionals, students, or anyone who
              needs to communicate effectively. Revolutionize the way you write
              emails today!
            </p>
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium"
            onClick={() => navigate('/emailapp')}
          >
            Let me try
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
