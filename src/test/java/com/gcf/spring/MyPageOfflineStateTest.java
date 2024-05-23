//package com.gcf.spring;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
//
//
//
//import java.util.Arrays;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.web.servlet.MockMvc;
//
//import com.gcf.spring.controller.MyPageOfflineStateController;
//import com.gcf.spring.entity.MyPageOfflineState;
//import com.gcf.spring.service.MyPageOfflineStateService;
//
//@WebMvcTest(MyPageOfflineStateController.class)
//public class MyPageOfflineStateTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private MyPageOfflineStateService myPageOfflineStateService;
//
//    private List<MyPageOfflineState> offlineStates;
//    private Map<MyPageOfflineState.Status, Long> statusCounts;
//
//    @BeforeEach
//    public void setUp() {
//        MyPageOfflineState state1 = new MyPageOfflineState();
//        state1.setId(1L);
//        state1.setCategory("교육");
//        state1.setName("교육 프로그램 A");
//        state1.setPeriod("2024-06-01 ~ 2024-06-30");
//        state1.setApproved(true);
//        state1.setStatus(MyPageOfflineState.Status.승인);
//
//        MyPageOfflineState state2 = new MyPageOfflineState();
//        state2.setId(2L);
//        state2.setCategory("체험");
//        state2.setName("체험 프로그램 B");
//        state2.setPeriod("2024-07-01 ~ 2024-07-31");
//        state2.setApproved(false);
//        state2.setStatus(MyPageOfflineState.Status.신청실패);
//
//        offlineStates = Arrays.asList(state1, state2);
//
//        statusCounts = new HashMap<>();
//        statusCounts.put(MyPageOfflineState.Status.전체, 2L);
//        statusCounts.put(MyPageOfflineState.Status.승인, 1L);
//        statusCounts.put(MyPageOfflineState.Status.신청실패, 1L);
//        statusCounts.put(MyPageOfflineState.Status.신청취소, 0L);
//    }
//
//    @Test
//    public void testGetAllMyPageOfflineStates() throws Exception {
//        Mockito.when(myPageOfflineStateService.getAllMyPageOfflineStates()).thenReturn(offlineStates);
//
//        mockMvc.perform(get("/api/offline-states"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.length()").value(offlineStates.size()))
//                .andExpect(jsonPath("$[0].id").value(offlineStates.get(0).getId()))
//                .andExpect(jsonPath("$[0].category").value(offlineStates.get(0).getCategory()))
//                .andExpect(jsonPath("$[0].name").value(offlineStates.get(0).getName()))
//                .andExpect(jsonPath("$[0].period").value(offlineStates.get(0).getPeriod()))
//                .andExpect(jsonPath("$[0].approved").value(offlineStates.get(0).isApproved()))
//                .andExpect(jsonPath("$[0].status").value(offlineStates.get(0).getStatus().name()));
//    }
//
//    @Test
//    public void testGetStatusCounts() throws Exception {
//        Mockito.when(myPageOfflineStateService.getStatusCounts()).thenReturn(statusCounts);
//
//        mockMvc.perform(get("/api/offline-states/status-counts")
//                .with(httpBasic("test", "1234"))) // 사용자 이름과 비밀번호를 설정
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.전체").value(statusCounts.get(MyPageOfflineState.Status.전체)))
//                .andExpect(jsonPath("$.승인").value(statusCounts.get(MyPageOfflineState.Status.승인)))
//                .andExpect(jsonPath("$.신청실패").value(statusCounts.get(MyPageOfflineState.Status.신청실패)))
//                .andExpect(jsonPath("$.신청취소").value(statusCounts.get(MyPageOfflineState.Status.신청취소)));
//    }
//}
