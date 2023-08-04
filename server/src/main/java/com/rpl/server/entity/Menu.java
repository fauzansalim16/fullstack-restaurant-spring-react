package com.rpl.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "menu")
@Builder
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nama_makanan", nullable = false)
    private String namaMakanan;

    @Column(nullable = false)
    private String gambar;

    @Column(nullable = false)
    private Integer harga;
}

