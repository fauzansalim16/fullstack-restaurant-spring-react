package com.rpl.server.model;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateUserRequest {
    @Size(max = 100)
    private String nama;

    @Size(max = 100)
    private String alamat;

    @Size(max = 100)
    private String noTelepon;

    @Size(max = 100)
    private String email;

    @Size(max = 100)
    private String password;

}
