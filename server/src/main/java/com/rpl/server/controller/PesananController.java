package com.rpl.server.controller;

import com.rpl.server.dto.PesananDTO;
import com.rpl.server.entity.Pesanan;
import com.rpl.server.entity.User;
import com.rpl.server.model.CreatePesananRequest;
import com.rpl.server.model.CreatePesananWrapper;
import com.rpl.server.model.WebResponse;
import com.rpl.server.service.PesananService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PesananController {
    @Autowired
    private PesananService pesananService;
    @PostMapping("/pesanan")
    public WebResponse<String> pesanMenu(User user, @RequestBody CreatePesananWrapper pesananWrapper) {
        List<CreatePesananRequest> pesananRequests = pesananWrapper.getPesananRequests();
        Pesanan pesanan = pesananService.buatPesanan(user, pesananRequests);
        return WebResponse.<String>builder().data("Pesanan berhasil diambil").build();
    }

    @GetMapping("/pesanan")
    public ResponseEntity<List<PesananDTO>> getAllPesanan(User user) {
        List<PesananDTO> pesananDTOList = pesananService.getAllPesanan(user);
        return ResponseEntity.ok(pesananDTOList);
    }
}
