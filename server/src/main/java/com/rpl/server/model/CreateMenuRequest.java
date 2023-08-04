package com.rpl.server.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateMenuRequest {
    @NotBlank
    @Size(max = 50)
    private String namaMakanan;

    @NotNull
    private Integer harga;

    @NotNull
    private MultipartFile gambar;
}
