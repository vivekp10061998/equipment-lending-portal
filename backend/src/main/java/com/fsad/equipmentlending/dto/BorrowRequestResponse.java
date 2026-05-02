package com.fsad.equipmentlending.dto;

import java.time.LocalDate;

public class BorrowRequestResponse {
    private Long id;
    private Long equipmentId;
    private String equipmentName;
    private Long userId;
    private String requestedBy;
    private String role;
    private LocalDate requestDate;
    private String status;

    public BorrowRequestResponse(Long id, Long equipmentId, String equipmentName, Long userId, String requestedBy, String role, LocalDate requestDate, String status) {
        this.id = id;
        this.equipmentId = equipmentId;
        this.equipmentName = equipmentName;
        this.userId = userId;
        this.requestedBy = requestedBy;
        this.role = role;
        this.requestDate = requestDate;
        this.status = status;
    }

    public Long getId() { return id; }
    public Long getEquipmentId() { return equipmentId; }
    public String getEquipmentName() { return equipmentName; }
    public Long getUserId() { return userId; }
    public String getRequestedBy() { return requestedBy; }
    public String getRole() { return role; }
    public LocalDate getRequestDate() { return requestDate; }
    public String getStatus() { return status; }
}
