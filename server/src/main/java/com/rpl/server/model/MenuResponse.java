package com.rpl.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MenuResponse {
    private Integer id;

    private String namaMakanan;

    private Integer harga;

    private String gambar;
}
