package com.rpl.server.repository;

import com.rpl.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findFirstByToken(String token);

    boolean existsByEmail(String email);
}
