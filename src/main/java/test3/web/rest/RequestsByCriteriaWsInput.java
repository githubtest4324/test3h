package test3.web.rest;

import java.util.Date;
import java.util.List;

import test3.domain.Customer;

public class RequestsByCriteriaWsInput {
	private String code;
	private String description;
	private String deliveryAddressCity;
	private List<Customer> customers;
	private Date startDate;
	private Date endDate;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDeliveryAddressCity() {
		return deliveryAddressCity;
	}

	public void setDeliveryAddressCity(String deliveryAddressCity) {
		this.deliveryAddressCity = deliveryAddressCity;
	}

	public List<Customer> getCustomers() {
		return customers;
	}

	public void setCustomers(List<Customer> customers) {
		this.customers = customers;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

}
