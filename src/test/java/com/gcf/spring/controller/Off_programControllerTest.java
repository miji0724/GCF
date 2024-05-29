package com.gcf.spring.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gcf.spring.dto.Off_ProgramDTO;
import com.gcf.spring.service.Off_programService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(Off_programController.class)
public class Off_programControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private Off_programService offProgramService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetAllPrograms() throws Exception {
        mockMvc.perform(get("/api/off_programs")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetProgramById() throws Exception {
        Off_ProgramDTO programDTO = new Off_ProgramDTO();
        programDTO.setOff_program_number(1);
        programDTO.setOff_program_name("Test Program");

        when(offProgramService.getProgramById(1)).thenReturn(Optional.of(programDTO));

        mockMvc.perform(get("/api/off_programs/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void testUpdateProgramStats() throws Exception {
        when(offProgramService.updateProgramStats(1, true, true, true)).thenReturn(true);

        mockMvc.perform(post("/api/off_programs/1/updateStats")
                .param("incrementViews", "true")
                .param("incrementLikes", "true")
                .param("toggleBookmark", "true"))
                .andExpect(status().isOk());
    }
}
