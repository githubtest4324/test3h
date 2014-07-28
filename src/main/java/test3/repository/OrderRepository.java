package test3.repository;

import test3.domain.Request;
        import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Order entity.
 */
public interface OrderRepository extends JpaRepository<Request, Long> {

}
