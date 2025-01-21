# Micro-Frontend Application 🚀

Welcome to the **Micro-Frontend Application** repository! This project demonstrates a modular architecture using React, Vite, and Module Federation, integrating three distinct applications: **Host App**, **Chat App**, and **Email App**.

## Project Structure 📂

The repository is organized as follows:

- `host-app/` : The main application that serves as the host. 🏠
- `chat-app/` : A micro-frontend for chat functionality. 💬
- `email-app/` : A micro-frontend for email functionality. 📧

## Getting Started 🛠️

To set up and run the applications locally, follow these steps:

1. **Clone the Repository**: Open your terminal and run:

   ```bash
   git clone https://github.com/sahil10023/micro-front-end.git
   cd micro-front-end
Install Dependencies: Navigate to each application directory and install the necessary packages:

bash
Copy
Edit
# For Chat App
cd chat-app
npm install
cd ..

# For Email App
cd email-app
npm install
cd ..

# For Host App
cd host-app
npm install
cd ..
Set Up Environment Variables: In the host-app directory, create a .env file and add your Cohere API key:

makefile
Copy
Edit
VITE_COHERE_API_KEY=your_cohere_api_key_here
Replace your_cohere_api_key_here with your actual API key.

Start the Applications: Open three separate terminal windows and run the following commands in each:

bash
Copy
Edit
# In the first terminal (Chat App)
cd chat-app
npm run start-mf
cd ..

# In the second terminal (Email App)
cd email-app
npm run start-mf
cd ..

# In the third terminal (Host App)
cd host-app
npm run dev
cd ..
This will start the applications on the following ports:

Chat App: http://localhost:5001
Email App: http://localhost:5002
Host App: http://localhost:5000
How It Works 🔧
Module Federation: The Host App dynamically loads the Chat App and Email App as remote components using Module Federation. The configuration in the Host App includes:

javascript
Copy
Edit
remotes: {
  chat_app: 'http://localhost:5001/assets/remoteEntry.js',
  email_app: 'http://localhost:5002/assets/remoteEntry.js',
}
This setup allows the Host App to consume components from the Chat and Email Apps seamlessly.

Lazy Loading: Components from the Chat and Email Apps are lazily loaded in the Host App to optimize performance.

React Router DOM: Routing is managed using React Router DOM, enabling navigation between different views within the Host App.

Tailwind CSS: Styling is handled with Tailwind CSS, providing a utility-first approach to design.

Cohere AI Integration: Both the Chat and Email Apps utilize Cohere AI for generating responses and content. The API key is securely stored in the .env file of the Host App.

Development Notes 📝
Starting Micro-Frontends: The Chat and Email Apps are started using the start-mf script, which builds and serves the applications:

json
Copy
Edit
"start-mf": "npm run build && npm run serve"
Host App: The Host App is started using the dev script:

json
Copy
Edit
"dev": "vite"
API Key: Ensure that the VITE_COHERE_API_KEY in the .env file is set correctly to enable AI functionalities.

Author ✍️
This project was developed by Sahil.

Acknowledgments 🙏
Special thanks to the creators of Vite, React, Module Federation, Tailwind CSS, and Cohere AI for their excellent tools and services.