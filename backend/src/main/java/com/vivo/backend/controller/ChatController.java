package com.vivo.backend.controller;

import com.vivo.backend.dto.ChatMessageDTO;
import com.vivo.backend.dto.MediaMessageDTO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController( SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat.sendMessage")
    public void handleMessage(@Payload ChatMessageDTO chatMessageDTO) {
        messagingTemplate.convertAndSend("/topic/public", chatMessageDTO);
    }

    @MessageMapping("/chat.uploadMedia")
    public void uploadMedia(@Payload MediaMessageDTO mediaMessageDTO) {
        messagingTemplate.convertAndSend("/topic/public", mediaMessageDTO);
    }
}
