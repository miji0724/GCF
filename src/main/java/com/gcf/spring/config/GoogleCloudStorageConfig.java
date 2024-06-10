package com.gcf.spring.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import java.io.IOException;

@Configuration
public class GoogleCloudStorageConfig {

    @Bean
    public Storage storage() throws IOException {
        // GCS 인증 정보를 로드합니다. 여기서는 resources 디렉토리에 있는 서비스 계정 키 파일을 사용합니다.
        GoogleCredentials credentials = GoogleCredentials.fromStream(
                new ClassPathResource("project-gcf-424105-d1392a5ef44a.json").getInputStream());

        // Storage 인스턴스를 생성합니다.
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        return storage;
    }
}