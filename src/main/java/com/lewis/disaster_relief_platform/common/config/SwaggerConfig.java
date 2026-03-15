package com.lewis.disaster_relief_platform.common.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI myCustomConfig() {
        return new OpenAPI().info(new Info().title("Disaster Relief Platform App - APIS Docs").description("Final Year Project- Group 1\n Prithu Kathet - Backend Developer"));
    }
}
