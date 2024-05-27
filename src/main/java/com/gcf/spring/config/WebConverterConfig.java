package com.gcf.spring.config;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.AbstractJackson2HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class WebConverterConfig implements WebMvcConfigurer {

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter(new ObjectMapper());
        converters.add(converter);
        converters.add(new MultipartJackson2HttpMessageConverter(new ObjectMapper()));
        // 다른 컨버터들도 추가할 수 있음
    }

    private static class MultipartJackson2HttpMessageConverter extends AbstractJackson2HttpMessageConverter {

        public MultipartJackson2HttpMessageConverter(ObjectMapper objectMapper) {
            super(objectMapper, MediaType.APPLICATION_OCTET_STREAM);
        }

        @Override
        public boolean canWrite(Class<?> clazz, MediaType mediaType) {
            return false;
        }

        @Override
        public boolean canWrite(java.lang.reflect.Type type, Class<?> clazz, MediaType mediaType) {
            return false;
        }

        @Override
        protected boolean canWrite(MediaType mediaType) {
            return false;
        }
    }
}
