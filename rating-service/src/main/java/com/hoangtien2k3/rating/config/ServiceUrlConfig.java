package com.hoangtien2k3.rating.config;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "ecommerce.services")
public class ServiceUrlConfig {
    private String product;
    private String customer;
    private String order;
}
