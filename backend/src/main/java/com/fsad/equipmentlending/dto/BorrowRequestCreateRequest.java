package com.fsad.equipmentlending.dto;

import jakarta.validation.constraints.NotNull;

public class BorrowRequestCreateRequest {
    @NotNull
    private Long equipmentId;

    @NotNull
    private Long userId;

    public Long getEquipmentId() { return equipmentId; }
    public void setEquipmentId(Long equipmentId) { this.equipmentId = equipmentId; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
