package com.rpl.server.service;

import com.rpl.server.dto.DetailPesananDTO;
import com.rpl.server.dto.MenuDTO;
import com.rpl.server.dto.PesananDTO;
import com.rpl.server.dto.UserDTO;
import com.rpl.server.entity.DetailPesanan;
import com.rpl.server.entity.Menu;
import com.rpl.server.entity.Pesanan;
import com.rpl.server.entity.User;
import com.rpl.server.model.CreateMenuRequest;
import com.rpl.server.model.CreatePesananRequest;
import com.rpl.server.repository.DetailPesananRepository;
import com.rpl.server.repository.MenuRepository;
import com.rpl.server.repository.PesananRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class PesananService {

    @Autowired
    private PesananRepository pesananRepository;
    @Autowired
    private DetailPesananRepository detailPesananRepository;
    @Autowired
    private MenuRepository menuRepository;

    public Pesanan buatPesanan(User user, List<CreatePesananRequest> pesananRequests) {
        int totalHarga = pesananRequests.stream()
                .mapToInt(request -> request.getHarga())
                .sum();

        Pesanan pesanan = new Pesanan();
        pesanan.setUser(user);
        pesanan.setTotalHarga(totalHarga);
        pesanan.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        pesanan = pesananRepository.save(pesanan);

        for (CreatePesananRequest pesananRequest : pesananRequests) {
            DetailPesanan detailPesanan = new DetailPesanan();
            detailPesanan.setPesanan(pesanan);
            Menu menu = menuRepository.findById(pesananRequest.getMenuId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "Menu with ID " + pesananRequest.getMenuId() + " not found"));
            detailPesanan.setMenu(menu);

            detailPesananRepository.save(detailPesanan);
        }

        return pesanan;
    }
    public List<PesananDTO> getAllPesanan(User userSama) {
        if (!isUserPedagang(userSama)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Anda tidak memiliki izin untuk melihat pesanan.");
        }
        List<Pesanan> pesananList = pesananRepository.findAll();
        List<PesananDTO> pesananDTOList = new ArrayList<>();

        for (Pesanan pesanan : pesananList) {
            PesananDTO pesananDTO = new PesananDTO();
            pesananDTO.setId(pesanan.getId());
            pesananDTO.setTotalHarga(pesanan.getTotalHarga());
            pesananDTO.setCreatedAt(pesanan.getCreatedAt());

            // Map informasi pemesan
            User user = pesanan.getUser();
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setNama(user.getNama());
            userDTO.setAlamat(user.getAlamat());
            userDTO.setNoTelepon(user.getNoTelepon());
            pesananDTO.setUser(userDTO);

            // Map detail pesanan
            List<DetailPesanan> detailPesananList = pesanan.getDetailPesananList();
            List<DetailPesananDTO> detailPesananDTOList = new ArrayList<>();
            for (DetailPesanan detailPesanan : detailPesananList) {
                DetailPesananDTO detailPesananDTO = new DetailPesananDTO();
                detailPesananDTO.setId(detailPesanan.getId());

                // Map informasi menu
                Menu menu = detailPesanan.getMenu();
                MenuDTO menuDTO = new MenuDTO();
                menuDTO.setId(menu.getId());
                menuDTO.setNamaMakanan(menu.getNamaMakanan());
                menuDTO.setHarga(menu.getHarga());
                detailPesananDTO.setMenu(menuDTO);

                detailPesananDTOList.add(detailPesananDTO);
            }
            pesananDTO.setDetailPesananList(detailPesananDTOList);

            pesananDTOList.add(pesananDTO);
        }

        return pesananDTOList;
    }
    private boolean isUserPedagang(User user) {
        return "pedagang".equalsIgnoreCase(user.getRole());
    }

}

