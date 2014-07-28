package test3.web.rest;

import com.codahale.metrics.annotation.Timed;
import test3.domain.Request;
import test3.repository.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * REST controller for managing Order.
 */
@RestController
@RequestMapping("/app")
public class OrderResource {

    private final Logger log = LoggerFactory.getLogger(OrderResource.class);

    @Inject
    private OrderRepository orderRepository;

    /**
     * POST  /rest/orders -> Create a new order.
     */
    @RequestMapping(value = "/rest/orders",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void create(@RequestBody Request order) {
        log.debug("REST request to save Order : {}", order);
        orderRepository.save(order);
    }

    /**
     * GET  /rest/orders -> get all the orders.
     */
    @RequestMapping(value = "/rest/orders",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Request> getAll() {
        log.debug("REST request to get all Orders");
        return orderRepository.findAll();
    }

    /**
     * GET  /rest/orders/:id -> get the "id" order.
     */
    @RequestMapping(value = "/rest/orders/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Request> get(@PathVariable Long id, HttpServletResponse response) {
        log.debug("REST request to get Order : {}", id);
        Request order = orderRepository.findOne(id);
        if (order == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    /**
     * DELETE  /rest/orders/:id -> delete the "id" order.
     */
    @RequestMapping(value = "/rest/orders/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable Long id) {
        log.debug("REST request to delete Order : {}", id);
        orderRepository.delete(id);
    }
}
