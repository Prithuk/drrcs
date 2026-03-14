package com.lewis.disaster_relief_platform.emergency.controller;

import com.lewis.disaster_relief_platform.common.dto.ApiResponse;
import com.lewis.disaster_relief_platform.common.dto.PageResponse;
import com.lewis.disaster_relief_platform.emergency.dto.request.EmergencyRequest;
import com.lewis.disaster_relief_platform.emergency.dto.response.EmergencyResponse;
import com.lewis.disaster_relief_platform.emergency.model.Status;
import com.lewis.disaster_relief_platform.emergency.repository.EmergencyRepository;
import com.lewis.disaster_relief_platform.emergency.service.EmergencyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.shaded.com.google.protobuf.Api;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/emergencies")
@RequiredArgsConstructor
@Slf4j
public class EmergencyController {
    private final EmergencyService emergencyService;
    private final EmergencyRepository emergencyRepository;

    /**
     * Create a new Emergency
     * POST /api/v1/emergencies
     */
    @PostMapping
    public ResponseEntity<ApiResponse<EmergencyResponse>> createEmergency(@Valid @RequestBody EmergencyRequest request) {
        log.info("Received Request to create Emergency : {}", request.getTitle());
        EmergencyResponse emergencyResponse = emergencyService.CreateEmergency(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(emergencyResponse, "Emergency created successfully "));
    }

    /**
     * Get all emergencies with pagination and sorting
     * GET /api/v1/emergencies?page=0&size=10&sort=createdAt,desc
     */
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<EmergencyResponse>>> getAllEmergencies(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "affectedPeople") String sortBy, @RequestParam(defaultValue = "DESC") String sortDirection) {
        log.info("Fetching emergencies - page: {}, size: {}, sortBy: {}", page, size, sortBy);
        Sort.Direction direction = sortDirection.equalsIgnoreCase("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC;
        log.info("DIrection:: {}", direction);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        Page<EmergencyResponse> emergencies = emergencyService.getAllEmergencies(pageable);
        return ResponseEntity.ok(ApiResponse.success(PageResponse.of(emergencies)));
    }


    /*
     * Get Emergency  By Id.
     * GET /api/v1/emergencies/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EmergencyResponse>> getEmergencyById(@PathVariable String id) {
        log.info("Fetching emergency with id: {}", id);
        EmergencyResponse emergencyById = emergencyService.getEmergencyById(id);
        return ResponseEntity.ok(ApiResponse.success(emergencyById));
    }


    /**
     * Update Emergency Status
     * PATCH /api/v1/emergencies/{id}/status
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<EmergencyResponse>> updateEmergencyStatus(@PathVariable String id, @RequestParam Status status) {
        log.info("Updating emergency {} status to {}", id, status);
        EmergencyResponse response = emergencyService.updateEmergencyStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success(response, "Emergency Status updated successfully. "));
    }

    /**
     * Assign volunteer to emergency
     * PATCH /api/v1/emergencies/{id}/assign
     */
    @PatchMapping("/{emergencyId}/{volunteerId}")
    public ResponseEntity<ApiResponse<EmergencyResponse>> assignVolunteer(@PathVariable String emergencyId, @PathVariable String volunteerId) {
        EmergencyResponse assignedVolunteer = emergencyService.assignVolunteer(emergencyId, volunteerId);
        return ResponseEntity.ok(ApiResponse.success(assignedVolunteer, "Volunteer assigned successfully"));
    }

    /**
     * Delete emergency
     * DELETE /api/v1/emergencies/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEmergency(@PathVariable String id){
        emergencyService.deleteEmergency(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Emergency deleted successfully"));
    }


    /**
     * Get Emergency Statistics
     * GET /api/v1/emergencies/stats
     */
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getStatistics(){
        log.info("Fetching emergency statistics");
        Map<String, Long> stats  = new HashMap<>();
        stats.put("total", emergencyService.getTotalEmergencies());
        stats.put("pending", emergencyService.getPendingEmergenciesCount());
        stats.put("resolved", emergencyService.getEmergenciesByStatus(Status.RESOLVED));
        stats.put("in_progress", emergencyService.getEmergenciesByStatus(Status.IN_PROGRESS));
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

}
