package com.fsad.equipmentlending.config;

import com.fsad.equipmentlending.entity.*;
import com.fsad.equipmentlending.repository.AppUserRepository;
import com.fsad.equipmentlending.repository.BorrowRequestRepository;
import com.fsad.equipmentlending.repository.EquipmentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(AppUserRepository userRepository,
                                   EquipmentRepository equipmentRepository,
                                   BorrowRequestRepository requestRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                userRepository.save(new AppUser("Admin User", "admin@school.com", "admin123", UserRole.ADMIN));
                userRepository.save(new AppUser("Student User", "student@school.com", "student123", UserRole.STUDENT));
                userRepository.save(new AppUser("Staff User", "staff@school.com", "staff123", UserRole.STAFF));
                userRepository.save(new AppUser("Aarav Sharma", "aarav@school.com", "student123", UserRole.STUDENT));
                userRepository.save(new AppUser("Priya Nair", "priya@school.com", "student123", UserRole.STUDENT));
                userRepository.save(new AppUser("Rahul Mehta", "rahul@school.com", "staff123", UserRole.STAFF));
            }

            if (equipmentRepository.count() == 0) {
                equipmentRepository.saveAll(generateEquipmentData());
            }

            if (requestRepository.count() == 0) {
                List<Equipment> equipment = equipmentRepository.findAll();
                AppUser student = userRepository.findByEmailIgnoreCase("student@school.com").orElseThrow();
                AppUser staff = userRepository.findByEmailIgnoreCase("staff@school.com").orElseThrow();
                AppUser aarav = userRepository.findByEmailIgnoreCase("aarav@school.com").orElseThrow();

                requestRepository.save(new BorrowRequest(equipment.get(0), student, LocalDate.now().minusDays(2), RequestStatus.PENDING));
                requestRepository.save(new BorrowRequest(equipment.get(1), staff, LocalDate.now().minusDays(4), RequestStatus.APPROVED));
                requestRepository.save(new BorrowRequest(equipment.get(2), aarav, LocalDate.now().minusDays(7), RequestStatus.RETURNED));
            }
        };
    }

    private List<Equipment> generateEquipmentData() {
        String[] categories = {
                "Sports", "Laboratory", "Media", "Classroom", "Music", "Robotics", "Art", "Library", "Workshop", "IT"
        };

        String[] names = {
                "Cricket Kit", "Football Set", "Basketball", "Badminton Racket Set", "Volleyball Net",
                "Microscope", "Test Tube Kit", "Lab Safety Kit", "Digital Weighing Scale", "Chemistry Model Set",
                "Canon DSLR Camera", "Tripod Stand", "Wireless Microphone", "Video Light", "Podcast Recorder",
                "Projector", "Whiteboard Kit", "Speaker System", "Presentation Remote", "Document Camera",
                "Guitar", "Keyboard", "Tabla Set", "Violin", "Drum Practice Pad",
                "Robotics Starter Kit", "Arduino Kit", "Sensor Module Pack", "Drone Kit", "Raspberry Pi Kit",
                "Paint Brush Set", "Clay Modelling Kit", "Canvas Pack", "Craft Cutter", "Sketching Kit",
                "Reference Book Set", "Atlas Set", "Dictionary Pack", "Magazine Bundle", "Story Book Kit",
                "Tool Box", "Soldering Kit", "Measuring Tape", "3D Printing Filament", "Safety Helmet",
                "Laptop", "Tablet", "WiFi Router", "LAN Cable Tester", "VR Headset"
        };

        String[] conditions = {"Excellent", "Good", "Fair"};

        String[] images = {
                "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=900&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=900&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop"
        };

        List<Equipment> data = new ArrayList<>();
        Random random = new Random(42);

        for (int i = 1; i <= 200; i++) {
            String baseName = names[(i - 1) % names.length];
            String category = categories[(i - 1) % categories.length];
            String condition = conditions[random.nextInt(conditions.length)];
            int quantity = 1 + random.nextInt(10);
            int available = random.nextInt(quantity + 1);
            String image = images[(i - 1) % images.length];

            data.add(new Equipment(
                    baseName + " " + String.format("%03d", i),
                    category,
                    condition,
                    quantity,
                    available,
                    image
            ));
        }

        return data;
    }
}
