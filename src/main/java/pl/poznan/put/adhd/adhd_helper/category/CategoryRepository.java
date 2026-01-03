package pl.poznan.put.adhd.adhd_helper.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByAdhdUser(AdhdUser adhdUser);

    List<Category> findByAdhdUserAndIdIn(AdhdUser adhdUser, Collection<Long> ids);

    long deleteByIdAndAdhdUser(Long id, AdhdUser adhdUser);

    Optional<Category> findByIdAndAdhdUser(Long id, AdhdUser adhdUser);
}
