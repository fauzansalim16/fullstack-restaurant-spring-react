package com.rpl.server.controller;

import com.rpl.server.entity.User;
import com.rpl.server.model.CreateMenuRequest;
import com.rpl.server.model.MenuResponse;
import com.rpl.server.model.WebResponse;
import com.rpl.server.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class MenuController {

    @Autowired
    private MenuService menuService;


    @PostMapping("/menu")
    public WebResponse<MenuResponse> create(User user,
            @ModelAttribute CreateMenuRequest request,
            @RequestParam("image") MultipartFile file
    ) throws IOException {
        MenuResponse menuResponse = menuService.create(user,request, file);
        return WebResponse.<MenuResponse>builder().data(menuResponse).build();
    }

    @GetMapping("/menu")
    public WebResponse<List<MenuResponse>> getAllMenus() {
        List<MenuResponse> menuResponses = menuService.getAllData();
        return WebResponse.<List<MenuResponse>>builder().data(menuResponses).build();
    }

    @GetMapping("menu/{id}")
    public WebResponse<MenuResponse> getMenuById(@PathVariable Integer id) {
        MenuResponse menuResponse = menuService.getMenuById(id);
        return WebResponse.<MenuResponse>builder().data(menuResponse).build();
    }

    @DeleteMapping("menu/{id}")
    public WebResponse<String> deleteMenuById(User user,@PathVariable Integer id) {
        menuService.deleteMenuById(user,id);
        return WebResponse.<String>builder().data("OK").build();
    }

    @PutMapping("menu/{id}")
    public WebResponse<MenuResponse> editMenuById(
            User user,
            @PathVariable Integer id,
            @RequestParam("image") MultipartFile file,
            @ModelAttribute CreateMenuRequest request) {
        MenuResponse menuResponse = menuService.editMenu(user,id, request, file);
        return WebResponse.<MenuResponse>builder().data(menuResponse).build();
    }

}

