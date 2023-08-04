package com.rpl.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nama;

    private String alamat;

    @Column(name = "no_telepon")
    private String noTelepon;

    private String email;

    private String password;

    private String role = "pembeli";

    private String token;

    @Column(name = "token_expired_at")
    private Long tokenExpiredAt;
}
