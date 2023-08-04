package com.rpl.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PesananDTO {
    private Long id;
    private UserDTO user;
    private List<DetailPesananDTO> detailPesananList;
    private int totalHarga;
    private Timestamp createdAt;
}
