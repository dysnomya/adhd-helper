package pl.poznan.put.adhd.adhd_helper.category;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.poznan.put.adhd.adhd_helper.configuration.audit.EnableUserFilter;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

import java.util.List;

@EnableUserFilter
interface CategoryRepository extends JpaRepository<Category, Long> {}
