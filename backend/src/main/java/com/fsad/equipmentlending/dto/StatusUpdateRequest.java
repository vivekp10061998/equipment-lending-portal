package com.fsad.equipmentlending.dto;

import com.fsad.equipmentlending.entity.RequestStatus;
import jakarta.validation.constraints.NotNull;

public class StatusUpdateRequest {
    @NotNull
    private RequestStatus status;

    public RequestStatus getStatus() { return status; }
    public void setStatus(RequestStatus status) { this.status = status; }
}
