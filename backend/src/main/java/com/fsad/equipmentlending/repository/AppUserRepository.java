package com.fsad.equipmentlending.repository;

import com.fsad.equipmentlending.entity.AppUser;
import com.fsad.equipmentlending.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmailIgnoreCase(String email);
    Optional<AppUser> findByEmailIgnoreCaseAndPasswordAndRole(String email, String password, UserRole role);
    boolean existsByEmailIgnoreCase(String email);
}
