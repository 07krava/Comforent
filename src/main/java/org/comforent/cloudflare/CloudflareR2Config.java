package org.comforent.cloudflare;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;

import java.net.URI;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class CloudflareR2Config {
    private final CloudflareR2Properties props;

    @Bean
    public S3Client r2Client() {
        return S3Client.builder()
            .endpointOverride(URI.create(props.getEndpoint()))
            .credentialsProvider(StaticCredentialsProvider.create(
                AwsBasicCredentials.create(props.getAccessKey(), props.getSecretKey())))
            .region(Region.US_EAST_1)
            .serviceConfiguration(S3Configuration.builder()
                .checksumValidationEnabled(false)
                .pathStyleAccessEnabled(true)
                .build())
            .build();
    }
}

