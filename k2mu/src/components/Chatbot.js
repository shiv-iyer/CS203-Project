import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "./Chatbot.css"; // Make sure to create this file for custom styles

export default function Chatbot() {
    const [show, setShow] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [response, setResponse] = useState("");
    const [personality, setPersonality] = useState("Magnus Carlson");

    const handleSend = async () => {
        if (!userInput) {
            alert("Please enter a question before sending.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8080/chess/advice", {
                userInput,
                personality
            });
            setResponse(res.data);
            setUserInput(""); // Clear the input after sending
        } catch (error) {
            console.error("Error getting advice:", error);
            setResponse("Sorry, there was an issue getting a response. Please try again later.");
        }
    };

    return (
        <>
            <Button
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    zIndex: 1000,
                }}
                onClick={() => setShow(!show)}
            >
                Chat with Chess Bot
            </Button>

            {show && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <h5>Chess Advice Bot</h5>
                        <button onClick={() => setShow(false)} className="close-btn">&times;</button>
                    </div>
                    <div className="chatbot-body">
                        <div className="chatbot-reply">
                            <p><strong>Bot Reply:</strong></p>
                            <div className="response-box">
                                {response || "No response yet. Ask a question!"}
                            </div>
                        </div>
                        <Form.Group>
                            <Form.Label>Personality</Form.Label>
                            <Form.Control
                                as="select"
                                value={personality}
                                onChange={(e) => setPersonality(e.target.value)}
                            >
                                <option>Magnus Carlson</option>
                                <option>Beth Harmon</option>
                                <option>Levy Rozman</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Your Question</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ask anything..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSend} className="send-btn">
                            Send
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
