package com.lewis.disaster_relief_platform.common.dto;


import com.lewis.disaster_relief_platform.emergency.model.EmergencyType;
import com.lewis.disaster_relief_platform.emergency.model.Priority;
import com.lewis.disaster_relief_platform.emergency.model.Status;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EmergencyFilterRequest {
    private String keyword;
    private EmergencyType type;
    private Status status;
    private String city;
    private String state;
    private LocalDateTime createdAfter;
    private LocalDateTime createdBefore;
    private Integer minAffectedPeople;
    private Integer maxAffectedPeople;
    private Priority priority;


}
