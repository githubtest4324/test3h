package test3.web.rest.requests;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import test3.domain.Request;
import test3.repository.RequestRepository;

@RestController
public class SaveRequestWs {

	@SuppressWarnings("unused")
	private final Logger log = LoggerFactory.getLogger(SaveRequestWs.class);

	@SuppressWarnings("unused")
	@Inject
	private RequestRepository requestRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@RequestMapping(value = "app/res/requests/save", method = RequestMethod.POST)
	@Transactional
	public boolean execute(@RequestBody Request request) {
		// requestRepository.save(request);
		Session session = entityManager.unwrap(Session.class);
		session.update(request);
		return true;
	}

	// @SuppressWarnings("unchecked")
	// @RequestMapping(value = "app/res/requests/save")
	// @Transactional
	// public List<Customer> execute(@RequestBody CustomersByCriteriaWsInput input) {
	// Session session = entityManager.unwrap(Session.class);
	// Criteria criteria = session.createCriteria(Customer.class);
	// // Name
	// CriteriaUtils.like(criteria, input.getName(), Customer.NAME);
	//
	// // Code
	// CriteriaUtils.like(criteria, input.getCode(), Customer.CODE);
	//
	// // City name
	// CriteriaUtils.like(
	// criteria.createCriteria(Customer.ADDRESS, JoinType.LEFT_OUTER_JOIN).createCriteria(Address.CITY,
	// JoinType.LEFT_OUTER_JOIN), input.getCity(), City.NAME);
	//
	// return criteria.list();
	// }

}
