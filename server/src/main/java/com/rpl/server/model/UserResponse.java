package com.rpl.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

    private String email;

    private String nama;

    private String alamat;

    private String noTelepon;

    private String role;
}
