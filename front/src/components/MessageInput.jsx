import React, { useState } from 'react';
import { sendMessage, sendMediaMessage } from '../api/WebSocketService';

const MessageInput = () => {
    const [messageContent, setMessageContent] = useState('');

    const handleTextSend = () => {
        if (messageContent.trim()) {
            sendMessage({ content: messageContent, type: 'TEXT', sender: 'User' });
            setMessageContent('');
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const mediaType = file.type.startsWith('image') ? 'IMAGE' : 'VIDEO';
                sendMediaMessage({ content: reader.result, type: mediaType, sender: 'User' });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="message-input">
            <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTextSend()}
                placeholder="Type a message..."
            />
            <input type="file" onChange={handleFileUpload} />
            <button onClick={handleTextSend}>Send</button>
        </div>
    );
};

export default MessageInput;
