package com.rpl.server.service;

import com.rpl.server.entity.Menu;
import com.rpl.server.entity.User;
import com.rpl.server.model.CreateMenuRequest;
import com.rpl.server.model.MenuResponse;
import com.rpl.server.repository.MenuRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class MenuService {
    @Autowired
    private MenuRepository menuRepository;

    private static final String FOLDER_PATH = "D:/Perkuliahan TI/Semester 4/Rekayasa Perangkat Lunak/Pertemuan 16/App/server/media/menu_images/";
    private static final String BASE_URL = "http://localhost:8080";

    @Autowired
    private ValidationService validationService;

    @Transactional
    public MenuResponse create(User user, CreateMenuRequest request, MultipartFile file) throws IOException {
        if (!isUserPedagang(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Anda tidak memiliki izin untuk membuat menu.");
        }

        String filePath = FOLDER_PATH + file.getOriginalFilename();

        Menu menu = menuRepository.save(Menu.builder()
                .gambar(filePath)
                .namaMakanan(request.getNamaMakanan())
                .harga(request.getHarga())
                .build());

        String imageUrl = BASE_URL + "/images/" + file.getOriginalFilename();
        menu.setGambar(imageUrl);
        menuRepository.save(menu);

        file.transferTo(new File(filePath));

        return toMenuResponse(menu);
    }

    private MenuResponse toMenuResponse(Menu menu) {
        String imageUrl = menu.getGambar();
        return MenuResponse.builder()
                .id(menu.getId())
                .namaMakanan(menu.getNamaMakanan())
                .harga(menu.getHarga())
                .gambar(imageUrl)
                .build();
    }

    @Transactional
    public List<MenuResponse> getAllData() {
        List<Menu> menus = menuRepository.findAll();
        List<MenuResponse> menuResponses = new ArrayList<>();

        for (Menu menu : menus) {
            MenuResponse menuResponse = toMenuResponse(menu);
            menuResponses.add(menuResponse);
        }

        return menuResponses;
    }

    @Transactional(readOnly = true)
    public MenuResponse getMenuById(Integer id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Menu with ID " + id + " not found"));

        return toMenuResponse(menu);
    }

    @Transactional
    public void deleteMenuById(User user, Integer id) {
        if (!isUserPedagang(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Anda tidak memiliki izin untuk menghapus menu.");
        }
        Optional<Menu> menuOptional = menuRepository.findById(id);
        if (menuOptional.isPresent()) {
            Menu menu = menuOptional.get();
            String imagePath = menu.getGambar();
            menuRepository.deleteById(id);
            deleteImageFromSystem(imagePath);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Menu with ID " + id + " not found");
        }
    }

    @Transactional
    public MenuResponse editMenu(User user, Integer id, CreateMenuRequest request, MultipartFile file) {
        if (!isUserPedagang(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Anda tidak memiliki izin untuk mengedit menu.");
        }

        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Menu with ID " + id + " not found"));

        String namaMakanan = request.getNamaMakanan();
        Integer harga = request.getHarga();

        if (namaMakanan != null) {
            menu.setNamaMakanan(namaMakanan);
        }

        if (harga != null) {
            menu.setHarga(harga);
        }

        if (file == null || file.isEmpty()) {
            return toMenuResponse(menuRepository.save(menu));
        }

        String oldImagePath = menu.getGambar().replace(BASE_URL + "/images/", "");
        File oldImageFile = new File(FOLDER_PATH + oldImagePath);
        if (oldImageFile.exists()) {
            if (oldImageFile.delete()) {
                System.out.println("Deleted old image: " + oldImagePath);
            } else {
                System.out.println("Failed to delete old image: " + oldImagePath);
            }
        }

        String filePath = FOLDER_PATH + file.getOriginalFilename();
        menu.setGambar(BASE_URL + "/images/" + file.getOriginalFilename());

        try {
            file.transferTo(new File(filePath));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload menu image");
        }

        return toMenuResponse(menuRepository.save(menu));
    }


    private boolean isUserPedagang(User user) {
        return "pedagang".equalsIgnoreCase(user.getRole());
    }
    private void deleteImageFromSystem(String imagePath) {
        try {
            String fileName = imagePath.substring(imagePath.lastIndexOf("/") + 1);
            Path path = Paths.get(FOLDER_PATH + fileName);
            Files.deleteIfExists(path);
        } catch (IOException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Menu image not found");
        }
    }

}
