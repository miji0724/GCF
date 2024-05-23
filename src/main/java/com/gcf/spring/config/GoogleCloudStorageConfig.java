package com.gcf.spring.config;

import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GoogleCloudStorageConfig {

    @Bean
    public Storage storage() {
        // Google Cloud Storage 인스턴스 생성
        Storage storage = StorageOptions.getDefaultInstance().getService();
        return storage;
    }
}
