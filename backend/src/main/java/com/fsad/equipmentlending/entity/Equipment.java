package com.fsad.equipmentlending.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "equipment")
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String conditionStatus;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Integer available;

    @Column(length = 1200)
    private String image;

    public Equipment() {
    }

    public Equipment(String name, String category, String conditionStatus, Integer quantity, Integer available, String image) {
        this.name = name;
        this.category = category;
        this.conditionStatus = conditionStatus;
        this.quantity = quantity;
        this.available = available;
        this.image = image;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
