import React, { useState } from "react";
import { COHERE_API_KEY } from "../utils/constants";

const EmailApp = ({apiKey}) => {
    const [recipient, setRecipient] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [generatedEmail, setGeneratedEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const generateEmail = async () => {
        if (!recipient.trim() || !subject.trim() || !body.trim()) return; // Prevent generating empty emails

        const emailContext = {
            role: "user",
            content: `You are an AI email assistant. Please generate a professional email in the following format:
            
                [Your subject here]
            
                [The content of the email here]
            
                Make sure the response contains a clear "Subject" line and a detailed "Body". Use the provided details:
                - Recipient: ${recipient}
                - Email context: ${body}
                
                Return only the subject and body in the response.`,
        };

        setLoading(true);

        try {
            const response = await fetch("https://api.cohere.ai/v2/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `BEARER ${apiKey ? apiKey : COHERE_API_KEY}`, // Replace with your Cohere API key
                },
                body: JSON.stringify({
                    model: "command-r-plus",
                    messages: [emailContext], // Send the email context to the AI
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch response from Cohere API.");
            }

            const data = await response.json();
            console.log(data);

            // Extract the subject and body from the response
            const content = data?.message?.content?.[0]?.text || "No response generated";
            const [rawSubject, ...bodyLines] = content.split("\n\n");

            // Clean up "Subject:" and "Body:" labels
            const cleanedSubject = rawSubject.replace(/^Subject:\s*/i, "").trim();
            const cleanedBody = bodyLines.join("\n\n").replace(/^Body:\s*/i, "").trim();

            setGeneratedEmail({ subject: cleanedSubject, body: cleanedBody });
        } catch (error) {
            console.error("Error communicating with Cohere API:", error);
            setGeneratedEmail("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="email-app bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">AI Email Generator</h2>
            <div className="email-form bg-white p-4 rounded-lg shadow-inner mb-4">
                <div className="mb-4">
                    <label className="block text-sm font-semibold">Recipient:</label>
                    <input
                        type="email"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Recipient's email address"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold">Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Subject of the email"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold">Body:</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Type the context of the email here..."
                        rows="6"
                    />
                </div>

                <button
                    onClick={generateEmail}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                    disabled={loading || !recipient.trim() || !subject.trim() || !body.trim()}
                >
                    Generate Email
                </button>
            </div>

            {loading && (
                <div className="loading text-gray-500 text-center">
                    <p>AI is generating the email...</p>
                </div>
            )}

            {generatedEmail && (
                <div className="email-preview mt-6 bg-white p-4 rounded-lg shadow-inner text-left">
                    <h3 className="text-xl font-semibold mb-2">Generated Email Preview:</h3>

                    <div>
                        <strong>Subject: </strong>
                        {generatedEmail.subject}
                    </div>

                    <div className="mt-4">
                        <strong>Body:</strong>
                        {/* Apply white-space: pre-line to preserve line breaks */}
                        <p style={{ whiteSpace: "pre-line" }}>{generatedEmail.body}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailApp;
