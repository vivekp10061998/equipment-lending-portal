package com.fsad.equipmentlending.repository;

import com.fsad.equipmentlending.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    List<Equipment> findByNameContainingIgnoreCase(String name);
    List<Equipment> findByCategoryIgnoreCase(String category);
}
