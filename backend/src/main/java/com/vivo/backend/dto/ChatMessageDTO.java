package com.vivo.backend.dto;

import com.vivo.backend.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDTO {
    private String content;
    private String sender;
    private MessageType type;

}
