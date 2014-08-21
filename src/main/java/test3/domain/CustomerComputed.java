package test3.domain;

public class CustomerComputed {
	private Customer customer;

	public CustomerComputed(Customer customer) {
		this.customer = customer;
	}

	public String getAsString() {
		if (customer.getName() == null) {
			return "N/A";
		} else {
			return this.customer.getName();
		}
	}

	public Object setAsString(String value) {
		// TODO Auto-generated method stub
		return null;
	}
}
