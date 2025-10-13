package pl.poznan.put.adhd.adhd_helper;

import org.springframework.boot.SpringApplication;

public class TestAdhdHelperApplication {

	public static void main(String[] args) {
		SpringApplication.from(AdhdHelperApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
