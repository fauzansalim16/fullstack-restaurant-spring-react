package com.rpl.server.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreatePesananRequest {

    private Integer menuId;

    @NotBlank
    @Size(max = 50)
    private String namaMakanan;

    @NotNull
    private Integer harga;

}