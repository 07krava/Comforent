package org.comforent.cloudflare;

import com.ulisesbocchio.jasyptspringboot.annotation.EncryptablePropertySource;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@EncryptablePropertySource("classpath:application.properties")
@ConfigurationProperties(prefix = "cloudflare.r2")
@Getter
@Setter
public class CloudflareR2Properties {
    private String endpoint;
    private String accessKey;
    private String secretKey;
    private String bucket;
    private String publicUrl;
}
