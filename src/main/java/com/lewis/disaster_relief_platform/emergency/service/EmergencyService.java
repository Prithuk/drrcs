package com.lewis.disaster_relief_platform.emergency.service;

import com.lewis.disaster_relief_platform.common.dto.EmergencyFilterRequest;
import com.lewis.disaster_relief_platform.common.exception.BusinessException;
import com.lewis.disaster_relief_platform.common.exception.ResourceNotFoundException;
import com.lewis.disaster_relief_platform.emergency.dto.request.EmergencyRequest;
import com.lewis.disaster_relief_platform.emergency.dto.response.EmergencyResponse;
import com.lewis.disaster_relief_platform.emergency.model.Emergency;
import com.lewis.disaster_relief_platform.emergency.model.Location;
import com.lewis.disaster_relief_platform.emergency.model.Status;
import com.lewis.disaster_relief_platform.emergency.repository.EmergencyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
@Slf4j
public class EmergencyService {
    private final EmergencyRepository emergencyRepository;
    private final EmergencyEventPublisher emergencyEventPublisher;
    // going to do call emergencyREPO,

    @Transactional
    public EmergencyResponse CreateEmergency(EmergencyRequest request) {
        log.info("Creating new emergency: {}", request.getTitle());
        validateEmergencyRequest(request);
        Location location = Location.builder().lalitude(request.getLocation().getLatitude()).longitude(request.getLocation().getLongitude()).address(request.getLocation().getAddress()).city(request.getLocation().getCity()).state(request.getLocation().getState()).zipCode(request.getLocation().getZipCode()).country(request.getLocation().getCountry()).build();

        Emergency emergency = Emergency.builder().title(request.getTitle()).description(request.getDescription()).type(request.getType()).priority(request.getPriority()).status(Status.PENDING).location(location).reportedBy(request.getReportedBy()).contactPhone(request.getContactPhone()).contactEmail(request.getContactEmail()).affectedPeople(request.getAffectedPeople()).createdAt(LocalDateTime.now()).updatedAt(LocalDateTime.now()).build();

        log.info("FROM SERVICE: ", emergency);

        Emergency savedEmergency = emergencyRepository.save(emergency);
        emergencyEventPublisher.publishEmergencyCreated(savedEmergency);
        log.info("Emergency saved with ID: {}", savedEmergency.getId());
        return EmergencyResponse.fromEntity(savedEmergency);
    }

    public Page<EmergencyResponse> getAllEmergencies(Pageable pageable) {
        log.info("Fetching emergencies - Page: {}, Size: {}", pageable.getPageNumber(), pageable.getPageSize());
        Page<Emergency> emergencies = emergencyRepository.findAll(pageable);
        log.info("FROM SERVICE:{}", emergencies);
        return emergencies.map(emergency -> EmergencyResponse.fromEntity(emergency));
    }

    public Page<EmergencyResponse> searchEmergencies(EmergencyFilterRequest filter, Pageable pageable) {
        log.info("Searching emergencies with filter {}", filter);
        Page<Emergency> emergencies;
        if (filter.getKeyword() != null && !filter.getKeyword().isEmpty()) {
            emergencies = emergencyRepository.searchByKeyword(filter.getKeyword(), pageable);
        } else if (filter.getStatus() != null && filter.getPriority() != null) {
            emergencies = emergencyRepository.findByStatusAndPriority(filter.getStatus(), filter.getPriority(), pageable);
        } else if (filter.getStatus() != null) {
            emergencies = emergencyRepository.findByStatus(filter.getStatus(), pageable);
        } else if (filter.getType() != null) {
            emergencies = emergencyRepository.findByType(filter.getType(), pageable);
        } else if (filter.getPriority() != null) {
            emergencies = emergencyRepository.findByPriority(filter.getPriority(), pageable);
        } else if (filter.getCity() != null) {
            emergencies = emergencyRepository.findByLocationCity(filter.getCity(), pageable);
        } else if (filter.getCreatedAfter() != null && filter.getCreatedBefore() != null) {
            emergencies = emergencyRepository.findByCreatedAtBetween(filter.getCreatedAfter(), filter.getCreatedBefore(), pageable);
        } else {
            emergencies = emergencyRepository.findAll(pageable);
        }
        return emergencies.map(emergency -> EmergencyResponse.fromEntity(emergency));
    }


    public EmergencyResponse getEmergencyById(String id) {
        Emergency emergency = emergencyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Emergency", "id", id));
        return EmergencyResponse.fromEntity(emergency);
    }


    @Transactional
    public EmergencyResponse updateEmergencyStatus(String id, Status newStatus) {
        Emergency emergency = emergencyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Emergency", "id", id));
        // business validation
        validateStatusTransition(emergency.getStatus(), newStatus);
        emergency.setStatus(newStatus);
        emergency.setUpdatedAt(LocalDateTime.now());
        if (newStatus == Status.RESOLVED) {
            emergency.setResolvedAt(LocalDateTime.now());
        }
        Emergency updatedEmergency = emergencyRepository.save(emergency);
        emergencyEventPublisher.publishStatusUpdated(updatedEmergency);
        return EmergencyResponse.fromEntity(updatedEmergency);
    }


    @Transactional
    public EmergencyResponse assignVolunteer(String emergencyId, String volunteerId) {
        log.info("Assigning volunteer {} to emergency {}", volunteerId, emergencyId);

        Emergency emergency = emergencyRepository.findById(emergencyId).orElseThrow(() -> new ResourceNotFoundException("Emergency", "id", emergencyId));
        if (emergency.getStatus() != Status.PENDING) {
            throw new BusinessException("Emergency must be in PENDING status to assign volunteers");
        }

        emergency.setAssignedVolunteerId(volunteerId);
        emergency.setStatus(Status.ASSIGNED);
        emergency.setUpdatedAt(LocalDateTime.now());
        Emergency updated = emergencyRepository.save(emergency);
        emergencyEventPublisher.publishVolunteerAssigned(updated, volunteerId);
        return EmergencyResponse.fromEntity(updated);
    }

    public void deleteEmergency(String id) {
        log.info("Attempting to delete emergency: {}", id);
        // Use findById only if you need to perform logic based on the object's state
        // before it's gone (e.g., "Cannot delete an emergency that is IN_PROGRESS")
        Emergency emergency = emergencyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Emergency", "id", id));

        // Example of why findById is better than existsById:
        if (emergency.getStatus() == Status.IN_PROGRESS) {
            throw new BusinessException("Cannot delete an emergency that is currently in progress");
        }
        emergencyRepository.deleteById(id);
        log.info("Emergency {} deleted successfully", id);
    }


    //statistics method
    public long getTotalEmergencies() {
        return emergencyRepository.count();
    }

    public long getPendingEmergenciesCount() {
        return emergencyRepository.countPendingEmergencies();
    }

    public long getEmergenciesByStatus(Status status) {
        return emergencyRepository.countByStatus(status);
    }

    private void validateEmergencyRequest(EmergencyRequest request) {
        if (request.getAffectedPeople() != null && request.getAffectedPeople() < 0) {
            throw new BusinessException("Affected people count cannot be negative");
        }

        if (request.getLocation().getLatitude() < -90 || request.getLocation().getLatitude() > 90) {
            throw new BusinessException("Invalid latitude value");
        }

        if (request.getLocation().getLongitude() < -180 || request.getLocation().getLongitude() > 180) {
            throw new BusinessException("Invalid longitude value");
        }
    }

    private void validateStatusTransition(Status currentStatus, Status newStatus) {
        // BUsiness rules for status transitions
        if (currentStatus == Status.RESOLVED && newStatus != Status.RESOLVED) {
            throw new BusinessException("Cannot Change Status of Resolved emergency.");
        }
        if (currentStatus == Status.CANCELLED) {
            throw new BusinessException("Cannot change status of cancelled emergency");
        }
    }


}
