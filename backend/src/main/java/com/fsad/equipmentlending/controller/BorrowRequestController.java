package com.fsad.equipmentlending.controller;

import com.fsad.equipmentlending.dto.BorrowRequestCreateRequest;
import com.fsad.equipmentlending.dto.BorrowRequestResponse;
import com.fsad.equipmentlending.dto.StatusUpdateRequest;
import com.fsad.equipmentlending.service.BorrowRequestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class BorrowRequestController {
    private final BorrowRequestService borrowRequestService;

    public BorrowRequestController(BorrowRequestService borrowRequestService) {
        this.borrowRequestService = borrowRequestService;
    }

    @GetMapping
    public ResponseEntity<List<BorrowRequestResponse>> getAllRequests() {
        return ResponseEntity.ok(borrowRequestService.getAllRequests());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BorrowRequestResponse>> getRequestsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(borrowRequestService.getRequestsByUser(userId));
    }

    @PostMapping
    public ResponseEntity<BorrowRequestResponse> createRequest(@Valid @RequestBody BorrowRequestCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(borrowRequestService.createRequest(request));
    }

    @PutMapping("/{requestId}/status")
    public ResponseEntity<BorrowRequestResponse> updateStatus(
            @PathVariable Long requestId,
            @Valid @RequestBody StatusUpdateRequest request
    ) {
        return ResponseEntity.ok(borrowRequestService.updateStatus(requestId, request.getStatus()));
    }
}
