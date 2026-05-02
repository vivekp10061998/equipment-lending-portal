package com.fsad.equipmentlending.repository;

import com.fsad.equipmentlending.entity.BorrowRequest;
import com.fsad.equipmentlending.entity.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BorrowRequestRepository extends JpaRepository<BorrowRequest, Long> {
    List<BorrowRequest> findByUserId(Long userId);
    boolean existsByEquipmentIdAndUserIdAndStatus(Long equipmentId, Long userId, RequestStatus status);
}
