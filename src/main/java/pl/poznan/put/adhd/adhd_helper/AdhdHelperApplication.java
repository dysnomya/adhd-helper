package pl.poznan.put.adhd.adhd_helper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AdhdHelperApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdhdHelperApplication.class, args);
    }
}
