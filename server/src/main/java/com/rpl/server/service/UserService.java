package com.rpl.server.service;

import com.rpl.server.entity.User;
import com.rpl.server.model.RegisterUserRequest;
import com.rpl.server.model.UpdateUserRequest;
import com.rpl.server.model.UserResponse;
import com.rpl.server.repository.UserRepository;
import com.rpl.server.security.BCrypt;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ValidationService validationService;

    @Transactional
    public void register(RegisterUserRequest request){
        validationService.validate(request);

        if (userRepository.existsByEmail(request.getEmail())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"email already registered");
        }

        User user = new User();
        user.setNama(request.getNama());
        user.setAlamat(request.getAlamat());
        user.setNoTelepon(request.getNoTelepon());
        user.setEmail(request.getEmail());
        user.setPassword(BCrypt.hashpw(request.getPassword(), BCrypt.gensalt()));

        userRepository.save(user);

    }
    public UserResponse get(User user) {
        return UserResponse.builder()
                .email(user.getEmail())
                .nama(user.getNama())
                .alamat(user.getAlamat())
                .noTelepon(user.getNoTelepon())
                .role(user.getRole())
                .build();
    }

    @Transactional
    public UserResponse update(User user, UpdateUserRequest request) {
        validationService.validate(request);

        log.info("REQUEST : {}", request);

        if (Objects.nonNull(request.getNama())) {
            user.setNama(request.getNama());
        }
        if (Objects.nonNull(request.getAlamat())) {
            user.setAlamat(request.getAlamat());
        }
        if (Objects.nonNull(request.getNoTelepon())) {
            user.setNoTelepon(request.getNoTelepon());
        }
        if (Objects.nonNull(request.getEmail())) {
            user.setEmail(request.getEmail());
        }
        if (Objects.nonNull(request.getPassword())) {
            user.setPassword(BCrypt.hashpw(request.getPassword(), BCrypt.gensalt()));
        }

        userRepository.save(user);

        log.info("USER : {}", user.getEmail());

        return UserResponse.builder()
                .nama(user.getNama())
                .nama(user.getAlamat())
                .nama(user.getNoTelepon())
                .nama(user.getEmail())
                .build();
    }

}
