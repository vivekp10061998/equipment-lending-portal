package com.fsad.equipmentlending.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class EquipmentRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String category;

    @NotBlank
    private String conditionStatus;

    @NotNull
    @Min(1)
    private Integer quantity;

    @NotNull
    @Min(0)
    private Integer available;

    private String image;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getConditionStatus() { return conditionStatus; }
    public void setConditionStatus(String conditionStatus) { this.conditionStatus = conditionStatus; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public Integer getAvailable() { return available; }
    public void setAvailable(Integer available) { this.available = available; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}
