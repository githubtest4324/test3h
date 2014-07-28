package test3.repository;

import test3.domain.Order;
        import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Order entity.
 */
public interface OrderRepository extends JpaRepository<Order, Long> {

}
