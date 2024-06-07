//package com.gcf.spring.util;
//
//import java.util.HashMap;
//import java.util.Map;
//
//public class MimeTypes {
//    private static final Map<String, String> mimeMap = new HashMap<>();
//
//    static {
//        // 일반적인 MIME 유형을 추가합니다. 필요에 따라 확장자와 해당 MIME 유형을 추가하십시오.
//        mimeMap.put("jpg", "image/jpeg");
//        mimeMap.put("jpeg", "image/jpeg");
//        mimeMap.put("png", "image/png");
//        mimeMap.put("pdf", "application/pdf");
//        // 다른 유형의 파일과 MIME 유형을 추가하십시오.
//    }
//
//    public static String getMimeType(String extension) {
//        // 확장자를 기반으로 MIME 유형을 가져옵니다.
//        return mimeMap.get(extension.toLowerCase());
//    }
//}