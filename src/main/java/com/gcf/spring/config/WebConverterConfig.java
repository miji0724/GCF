package com.gcf.spring.config;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.AbstractJackson2HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class WebConverterConfig implements WebMvcConfigurer {

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter(new ObjectMapper());
        converters.add(converter);
        converters.add(new MultipartJackson2HttpMessageConverter(new ObjectMapper()));
    }

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer.defaultContentType(MediaType.APPLICATION_JSON);
    }

    private static class MultipartJackson2HttpMessageConverter extends AbstractJackson2HttpMessageConverter {

        public MultipartJackson2HttpMessageConverter(ObjectMapper objectMapper) {
            super(objectMapper, MediaType.APPLICATION_OCTET_STREAM);
        }

        @Override
        public boolean canWrite(Class<?> clazz, MediaType mediaType) {
            return MediaType.MULTIPART_FORM_DATA.includes(mediaType) || MediaType.APPLICATION_OCTET_STREAM.includes(mediaType);
        }

        @Override
        public boolean canWrite(java.lang.reflect.Type type, Class<?> clazz, MediaType mediaType) {
            return MediaType.MULTIPART_FORM_DATA.includes(mediaType) || MediaType.APPLICATION_OCTET_STREAM.includes(mediaType);
        }

        @Override
        protected boolean canWrite(MediaType mediaType) {
            return MediaType.MULTIPART_FORM_DATA.includes(mediaType) || MediaType.APPLICATION_OCTET_STREAM.includes(mediaType);
        }
    }
}
