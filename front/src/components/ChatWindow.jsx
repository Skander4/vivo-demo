// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import {
    connectWebSocket,
    sendMessage,
    sendMediaMessage,
    disconnectWebSocket
} from '../api/webSocketService';
import './ChatWindow.css';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        connectWebSocket((message) => setMessages((prevMessages) => [...prevMessages, message]));

        return () => disconnectWebSocket()
    }, []);

    const handleSendMessage = () => {
        if (input.trim()) {
            sendMessage({ content: input, type: 'TEXT', sender: 'User' });
            setInput('');
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            sendMediaMessage({ content: base64String, fileType: file.type, type: 'MEDIA', sender: 'User' });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="chat-window">
            <div className="chat-messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.type}`}>
                        {msg.type === 'TEXT' && <p>{msg.content}</p>}
                        {msg.type === 'MEDIA' && (
                            <>
                                {msg.fileType.startsWith('image/') ? (
                                    <img src={msg.content} alt="Uploaded Image" />
                                ) : msg.fileType.startsWith('video/') ? (
                                    <video controls>
                                        <source src={msg.content} type={msg.fileType} />
                                        I did not implement the video part
                                    </video>
                                ) : null}
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                />
                <input type="file" onChange={handleFileUpload} />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;
