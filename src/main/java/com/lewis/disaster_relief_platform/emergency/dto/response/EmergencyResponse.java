package com.lewis.disaster_relief_platform.emergency.dto.response;

import com.lewis.disaster_relief_platform.emergency.model.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyResponse {
    private String id;
    private String title;
    private String description;
    private EmergencyType type;
    private Priority priority;
    private Status status;
    private Location location;
    private String reportedBy;
    private String contactPhone;
    private String contactEmail;
    private Integer affectedPeople;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    // Factory Method to convert from Emergency entity
    public static EmergencyResponse fromEntity(Emergency emergency) {
        return EmergencyResponse.builder().
                id(emergency.getId()).
                title(emergency.getTitle())
                .description(emergency.getDescription())
                .type(emergency.getType())
                .priority(emergency.getPriority())
                .status(emergency.getStatus())
                .location(emergency.getLocation())
                .reportedBy(emergency.getReportedBy())
                .contactPhone(emergency.getContactPhone())
                .contactEmail(emergency.getContactEmail())
                .affectedPeople(emergency.getAffectedPeople())
                .createdAt(emergency.getCreatedAt())
                .updatedAt(emergency.getUpdatedAt())
                .build();
    }
}
