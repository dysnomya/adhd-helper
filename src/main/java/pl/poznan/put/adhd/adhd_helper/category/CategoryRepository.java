package pl.poznan.put.adhd.adhd_helper.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

import java.util.List;

@Repository
interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByAdhdUser(AdhdUser adhdUser);
}
