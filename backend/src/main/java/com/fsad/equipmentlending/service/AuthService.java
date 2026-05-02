package com.fsad.equipmentlending.service;

import com.fsad.equipmentlending.dto.AuthResponse;
import com.fsad.equipmentlending.dto.LoginRequest;
import com.fsad.equipmentlending.dto.RegisterRequest;
import com.fsad.equipmentlending.entity.AppUser;
import com.fsad.equipmentlending.entity.UserRole;
import com.fsad.equipmentlending.exception.ApiException;
import com.fsad.equipmentlending.repository.AppUserRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {
    private final AppUserRepository appUserRepository;

    public AuthService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public AuthResponse login(LoginRequest request) {
        AppUser user = appUserRepository
                .findByEmailIgnoreCaseAndPasswordAndRole(request.getEmail(), request.getPassword(), request.getRole())
                .orElseThrow(() -> new ApiException("Invalid email, password, or role."));

        return toAuthResponse(user);
    }

    public AuthResponse register(RegisterRequest request) {
        if (request.getRole() == UserRole.ADMIN) {
            throw new ApiException("Admin registration is not allowed from public signup.");
        }

        if (appUserRepository.existsByEmailIgnoreCase(request.getEmail())) {
            throw new ApiException("Email already registered.");
        }

        AppUser user = new AppUser(request.getName(), request.getEmail(), request.getPassword(), request.getRole());
        AppUser savedUser = appUserRepository.save(user);
        return toAuthResponse(savedUser);
    }

    private AuthResponse toAuthResponse(AppUser user) {
        String fakeToken = "demo-token-" + UUID.randomUUID();
        return new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getRole().name(), fakeToken);
    }
}
