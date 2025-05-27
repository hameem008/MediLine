package com.example.MediLine.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080") // React dev server
                .allowedMethods("*")                    // Allow GET, POST, PUT, DELETE, etc.
                .allowedHeaders("*")                    // Allow all headers (e.g., Content-Type, Authorization)
                .allowCredentials(true);                // Allow sending cookies or auth headers
    }
}
