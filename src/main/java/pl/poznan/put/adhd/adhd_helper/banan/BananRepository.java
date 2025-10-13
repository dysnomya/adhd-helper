package pl.poznan.put.adhd.adhd_helper.banan;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BananRepository extends JpaRepository<BananEntity, Integer> {

}
