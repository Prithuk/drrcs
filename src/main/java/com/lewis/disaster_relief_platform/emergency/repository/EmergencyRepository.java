package com.lewis.disaster_relief_platform.emergency.repository;

import com.lewis.disaster_relief_platform.emergency.model.Emergency;
import com.lewis.disaster_relief_platform.emergency.model.EmergencyType;
import com.lewis.disaster_relief_platform.emergency.model.Priority;
import com.lewis.disaster_relief_platform.emergency.model.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EmergencyRepository extends MongoRepository<Emergency, String> {

    Page<Emergency> findByStatus(Status status, Pageable pageable);

    Page<Emergency> findByType(EmergencyType type, Pageable pageable);

    Page<Emergency> findByPriority(Priority priority, Pageable pageable);

    @Query("{'title': {$regex:  ?0, $options: 'i'}}")
    Page<Emergency> searchByTitle(String keyword, Pageable pageable);


    @Query("{'$or': [{'title': {$regex: ?0, $options: 'i'}}, {'description': {$regex: ?0, $options: 'i'}}]}")
    Page<Emergency> searchByKeyword(String keyword, Pageable pageable);


    Page<Emergency> findByLocationCity(String city, Pageable pageable);

    Page<Emergency> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);

    @Query("{'status': ?0, 'priority': ?1}")
    Page<Emergency> findByStatusAndPriority(Status status, Priority priority, Pageable pageable);


    long countByStatus(Status status);

    long countByPriority(Priority priority);

    @Query(value = "{'status': 'PENDING'}", count = true)
    long countPendingEmergencies();

}
