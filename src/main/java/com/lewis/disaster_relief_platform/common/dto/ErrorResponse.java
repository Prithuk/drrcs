package com.lewis.disaster_relief_platform.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private String message;
    private int status;
    private String error;
    private LocalDateTime timestamp;
    private String path;
    private Map<String, String> validationErrors;

    public static ErrorResponse of(String message, int status, String error, String path) {
        return ErrorResponse.builder()
                .message(message)
                .status(status)
                .error(error)
                .timestamp(LocalDateTime.now())
                .path(path)
                .build();
    }
}
