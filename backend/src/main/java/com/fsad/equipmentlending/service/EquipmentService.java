package com.fsad.equipmentlending.service;

import com.fsad.equipmentlending.dto.EquipmentRequest;
import com.fsad.equipmentlending.entity.Equipment;
import com.fsad.equipmentlending.exception.ApiException;
import com.fsad.equipmentlending.repository.EquipmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentService {
    private final EquipmentRepository equipmentRepository;

    public EquipmentService(EquipmentRepository equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }

    public List<Equipment> getAllEquipment(String search, String category) {
        if (search != null && !search.isBlank()) {
            return equipmentRepository.findByNameContainingIgnoreCase(search.trim());
        }

        if (category != null && !category.isBlank() && !category.equalsIgnoreCase("All")) {
            return equipmentRepository.findByCategoryIgnoreCase(category.trim());
        }

        return equipmentRepository.findAll();
    }

    public Equipment getEquipmentById(Long id) {
        return equipmentRepository.findById(id)
                .orElseThrow(() -> new ApiException("Equipment not found."));
    }

    public Equipment addEquipment(EquipmentRequest request) {
        validateAvailability(request.getQuantity(), request.getAvailable());
        Equipment equipment = new Equipment(
                request.getName(),
                request.getCategory(),
                request.getConditionStatus(),
                request.getQuantity(),
                request.getAvailable(),
                resolveImage(request.getImage())
        );
        return equipmentRepository.save(equipment);
    }

    public Equipment updateEquipment(Long id, EquipmentRequest request) {
        validateAvailability(request.getQuantity(), request.getAvailable());
        Equipment equipment = getEquipmentById(id);
        equipment.setName(request.getName());
        equipment.setCategory(request.getCategory());
        equipment.setConditionStatus(request.getConditionStatus());
        equipment.setQuantity(request.getQuantity());
        equipment.setAvailable(request.getAvailable());
        equipment.setImage(resolveImage(request.getImage()));
        return equipmentRepository.save(equipment);
    }

    public void deleteEquipment(Long id) {
        if (!equipmentRepository.existsById(id)) {
            throw new ApiException("Equipment not found.");
        }
        equipmentRepository.deleteById(id);
    }

    private void validateAvailability(Integer quantity, Integer available) {
        if (available > quantity) {
            throw new ApiException("Available count cannot be greater than total quantity.");
        }
    }

    private String resolveImage(String image) {
        if (image == null || image.isBlank()) {
            return "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=900&auto=format&fit=crop";
        }
        return image;
    }
}
