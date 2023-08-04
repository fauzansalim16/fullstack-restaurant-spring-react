package com.rpl.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetailPesananDTO {
    private Long id;
    private MenuDTO menu;
}
