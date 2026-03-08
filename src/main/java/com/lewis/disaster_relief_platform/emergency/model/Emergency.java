package com.lewis.disaster_relief_platform.emergency.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "emergencies")
public class Emergency {
    @Id
    private String id;

    @Indexed
    private String title;

    private String description;

    @Indexed
    private EmergencyType type;

    @Indexed
    private Priority priority;

    @Indexed
    private Status status;

    private Location location;

    private String reportedBy;

    private String contactPhone;

    private String contactEmail;

    private Integer affectedPeople;

    private List<String> requiredResources;

    private String assignedVolunteerId;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    private LocalDateTime resolvedAt;
}
