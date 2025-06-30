package org.comforent;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEncryptableProperties
public class ComforentApplication {

    public static void main(String[] args) {
        SpringApplication.run(ComforentApplication.class, args);
    }

}
