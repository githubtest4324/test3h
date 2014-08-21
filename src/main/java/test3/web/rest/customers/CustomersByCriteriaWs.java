package test3.web.rest.customers;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.sql.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import test3.domain.Address;
import test3.domain.City;
import test3.domain.Customer;
import test3.repository.CriteriaUtils;

@RestController
public class CustomersByCriteriaWs {

	@SuppressWarnings("unused")
	private final Logger log = LoggerFactory.getLogger(CustomersByCriteriaWs.class);

	@PersistenceContext
	private EntityManager entityManager;

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "app/res/customers/byCriteria")
	@Transactional
	public List<Customer> execute(@RequestBody CustomersByCriteriaWsInput input) {
		Session session = entityManager.unwrap(Session.class);
		Criteria criteria = session.createCriteria(Customer.class);
		// Name
		CriteriaUtils.like(criteria, input.getName(), Customer.NAME);

		// Code
		CriteriaUtils.like(criteria, input.getCode(), Customer.CODE);

		// City name
		CriteriaUtils.like(
				criteria.createCriteria(Customer.ADDRESS, JoinType.LEFT_OUTER_JOIN).createCriteria(Address.CITY,
						JoinType.LEFT_OUTER_JOIN), input.getCity(), City.NAME);

		return criteria.list();
	}

}
