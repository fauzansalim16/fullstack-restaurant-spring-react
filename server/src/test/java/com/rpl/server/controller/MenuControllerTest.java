package com.rpl.server.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rpl.server.repository.UserRepository;
import com.rpl.server.service.MenuService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.nio.charset.StandardCharsets;

import static org.mockito.Mockito.*;

@WebMvcTest(MenuController.class)
public class MenuControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private MenuService menuService;

    @MockBean
    private UserRepository userRepository;

//    @Test
//    void uploadImageToFIleSystem_Success() throws Exception {
//        String filePath = "D:/Coding/Bahasa Java-Kotlin/Java-Spring/spring-upload-image/file-storage/src/main/resources/static/images/gambar.png";
//
//        MockMultipartFile file = new MockMultipartFile("image", "gambar.png", "image/png",
//                "image content".getBytes(StandardCharsets.UTF_8));
//
//        when(menuService.uploadImageToFileSystem(file)).thenReturn("file uploaded successfully : " + filePath);
//
//        mockMvc.perform(MockMvcRequestBuilders.multipart("/menu")
//                        .file(file))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.content().string("file uploaded successfully : " + filePath));
//
//        verify(menuService, times(1)).uploadImageToFileSystem(file);
//    }

}
