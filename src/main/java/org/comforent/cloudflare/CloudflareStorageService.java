package org.comforent.cloudflare;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
@RequiredArgsConstructor
public class CloudflareStorageService {
    private final S3Client r2Client;
    private final CloudflareR2Properties props;

    public String upload(String key, byte[] content) {
        r2Client.putObject(PutObjectRequest.builder()
                .bucket(props.getBucket())
                .key(key)
                .acl(ObjectCannedACL.PUBLIC_READ)
                .build(),
            RequestBody.fromBytes(content));

        return props.getPublicUrl() + "/" + key;
    }
}
