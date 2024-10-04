import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;
export let isConnected = false;

export const connectWebSocket = (onMessageReceived) => {
    const socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        isConnected = true;
        console.log('WebSocket connected');

        stompClient.subscribe('/topic/public', (message) => {
            onMessageReceived(JSON.parse(message.body));
        });
    }, (error) => {
        console.error('WebSocket connection error:', error);
        isConnected = false;
    });
};

export const sendMessage = (chatMessage) => {
    if (isConnected && stompClient && stompClient.connected) {
        stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
    } else {
        console.error('WebSocket connection not established yet.');
    }
};

export const sendMediaMessage = (mediaMessage) => {
    if (isConnected && stompClient && stompClient.connected) {
        stompClient.send('/app/chat.uploadMedia', {}, JSON.stringify(mediaMessage));
    } else {
        console.error('WebSocket connection not established yet.');
    }
};

export const disconnectWebSocket = () => {
    if (stompClient !== null && stompClient.connected) {
        stompClient.disconnect(() => {
            console.log('WebSocket disconnected');
        });
        isConnected = false;
    }
};
