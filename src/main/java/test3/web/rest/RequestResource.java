package test3.web.rest;

import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.Junction;
import org.hibernate.criterion.Restrictions;
import org.hibernate.sql.DisjunctionFragment;
import org.hibernate.sql.JoinType;
import org.joda.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import test3.domain.Address;
import test3.domain.City;
import test3.domain.Customer;
import test3.domain.Request;
import test3.repository.CriteriaUtils;
import test3.repository.RequestRepository;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * REST controller for managing Request.
 */
@RestController
@RequestMapping("/app")
public class RequestResource {

	private final Logger log = LoggerFactory.getLogger(RequestResource.class);

	@Inject
	private RequestRepository requestRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/rest/requests/byCriteria")
	@Timed
	@Transactional
	public List<Request> requestsByCriteriaWs(@RequestBody RequestsByCriteriaWsInput input) {
		Session session = entityManager.unwrap(Session.class);
		Criteria criteria = session.createCriteria(Request.class);

		// Code
		CriteriaUtils.like(criteria, input.getCode(), Request.CODE);

		// Description
		CriteriaUtils.like(criteria, input.getDescription(), Request.DESCRIPTION);

		// Delivery date
		if (input.getStartDate() != null) {
			criteria.add(Restrictions.ge(Request.EXPECTED_DELIVERY_DATE, new LocalDate(input.getStartDate())));
		}
		if (input.getEndDate() != null) {
			criteria.add(Restrictions.le(Request.EXPECTED_DELIVERY_DATE, new LocalDate(input.getEndDate())));
		}

		// Delivery city
		CriteriaUtils.like(
				criteria.createCriteria(Request.DELIVERY_ADDRESS, JoinType.LEFT_OUTER_JOIN).createCriteria(Address.CITY,
						JoinType.LEFT_OUTER_JOIN), input.getDeliveryAddressCity(), City.NAME);

		// Customers
		if (input.getCustomers() != null) {
			Junction custOr = Restrictions.disjunction();
			for (Customer cust : input.getCustomers()) {
				custOr.add(Restrictions.eqOrIsNull(Customer.ID, cust.getId()));
			}
			criteria.add(custOr);
		}

		List<Request> res = criteria.list();

		return res;
	}

	/**
	 * POST /rest/requests -> Create a new request.
	 */
	@RequestMapping(value = "/rest/requests", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public void create(@RequestBody Request request) {
		log.debug("REST request to save Request : {}", request);
		requestRepository.save(request);
	}

	/**
	 * GET /rest/requests -> get all the requests.
	 */
	@RequestMapping(value = "/rest/requests", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public List<Request> getAll() {
		log.debug("REST request to get all Requests");
		return requestRepository.findAll();
	}

	/**
	 * GET /rest/requests/:id -> get the "id" request.
	 */
	@RequestMapping(value = "/rest/requests/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity<Request> get(@PathVariable Long id, HttpServletResponse response) {
		log.debug("REST request to get Request : {}", id);
		Request request = requestRepository.findOne(id);
		if (request == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(request, HttpStatus.OK);
	}

	/**
	 * DELETE /rest/requests/:id -> delete the "id" request.
	 */
	@RequestMapping(value = "/rest/requests/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public void delete(@PathVariable Long id) {
		log.debug("REST request to delete Request : {}", id);
		requestRepository.delete(id);
	}
}
