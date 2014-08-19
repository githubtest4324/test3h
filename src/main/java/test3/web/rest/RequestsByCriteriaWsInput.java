package test3.web.rest;

import java.util.Date;
import java.util.List;

import test3.domain.Customer;

public class RequestsByCriteriaWsInput{
	private String name;
	private String code;
	private String deliveryAddressCity;
	private List<Customer> customers;
	private Date startDate;
	private Date endtDate;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
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
	public Date getEndtDate() {
		return endtDate;
	}
	public void setEndtDate(Date endtDate) {
		this.endtDate = endtDate;
	}
	
}
