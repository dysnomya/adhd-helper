package pl.poznan.put.adhd.adhd_helper;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
class AdhdHelperApplicationTests {

	@Test
	void contextLoads() {
	}

}
