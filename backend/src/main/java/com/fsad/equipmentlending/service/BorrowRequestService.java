package com.fsad.equipmentlending.service;

import com.fsad.equipmentlending.dto.BorrowRequestCreateRequest;
import com.fsad.equipmentlending.dto.BorrowRequestResponse;
import com.fsad.equipmentlending.entity.*;
import com.fsad.equipmentlending.exception.ApiException;
import com.fsad.equipmentlending.repository.AppUserRepository;
import com.fsad.equipmentlending.repository.BorrowRequestRepository;
import com.fsad.equipmentlending.repository.EquipmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class BorrowRequestService {
    private final BorrowRequestRepository borrowRequestRepository;
    private final EquipmentRepository equipmentRepository;
    private final AppUserRepository appUserRepository;

    public BorrowRequestService(BorrowRequestRepository borrowRequestRepository, EquipmentRepository equipmentRepository, AppUserRepository appUserRepository) {
        this.borrowRequestRepository = borrowRequestRepository;
        this.equipmentRepository = equipmentRepository;
        this.appUserRepository = appUserRepository;
    }

    public List<BorrowRequestResponse> getAllRequests() {
        return borrowRequestRepository.findAll().stream().map(this::toResponse).toList();
    }

    public List<BorrowRequestResponse> getRequestsByUser(Long userId) {
        return borrowRequestRepository.findByUserId(userId).stream().map(this::toResponse).toList();
    }

    @Transactional
    public BorrowRequestResponse createRequest(BorrowRequestCreateRequest request) {
        Equipment equipment = equipmentRepository.findById(request.getEquipmentId())
                .orElseThrow(() -> new ApiException("Equipment not found."));

        AppUser user = appUserRepository.findById(request.getUserId())
                .orElseThrow(() -> new ApiException("User not found."));

        if (user.getRole() == UserRole.ADMIN) {
            throw new ApiException("Admin cannot create borrow request.");
        }

        if (equipment.getAvailable() <= 0) {
            throw new ApiException("Equipment is not available.");
        }

        boolean pendingExists = borrowRequestRepository.existsByEquipmentIdAndUserIdAndStatus(
                equipment.getId(), user.getId(), RequestStatus.PENDING
        );

        if (pendingExists) {
            throw new ApiException("You already have a pending request for this equipment.");
        }

        BorrowRequest borrowRequest = new BorrowRequest(equipment, user, LocalDate.now(), RequestStatus.PENDING);
        BorrowRequest saved = borrowRequestRepository.save(borrowRequest);
        return toResponse(saved);
    }

    @Transactional
    public BorrowRequestResponse updateStatus(Long requestId, RequestStatus status) {
        BorrowRequest request = borrowRequestRepository.findById(requestId)
                .orElseThrow(() -> new ApiException("Borrow request not found."));

        Equipment equipment = request.getEquipment();

        if (status == RequestStatus.APPROVED && request.getStatus() != RequestStatus.APPROVED) {
            if (equipment.getAvailable() <= 0) {
                throw new ApiException("Equipment is not available for approval.");
            }
            equipment.setAvailable(equipment.getAvailable() - 1);
            equipmentRepository.save(equipment);
        }

        if (status == RequestStatus.RETURNED && request.getStatus() == RequestStatus.APPROVED) {
            if (equipment.getAvailable() < equipment.getQuantity()) {
                equipment.setAvailable(equipment.getAvailable() + 1);
                equipmentRepository.save(equipment);
            }
        }

        request.setStatus(status);
        BorrowRequest saved = borrowRequestRepository.save(request);
        return toResponse(saved);
    }

    private BorrowRequestResponse toResponse(BorrowRequest request) {
        return new BorrowRequestResponse(
                request.getId(),
                request.getEquipment().getId(),
                request.getEquipment().getName(),
                request.getUser().getId(),
                request.getUser().getName(),
                request.getUser().getRole().name(),
                request.getRequestDate(),
                request.getStatus().name()
        );
    }
}
