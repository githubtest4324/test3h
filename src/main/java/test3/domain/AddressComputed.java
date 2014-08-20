package test3.domain;

public class AddressComputed {
	private Address address;

	public AddressComputed(Address address) {
		this.address = address;
	}

	public String getAsString() {
		String name = address.getName() == null ? "N/A" : address.getName();
		String city = address.getCity() == null ? "N/A" : address.getCity().getName() == null ? "N/A" : address.getCity()
				.getName();
		String country = address.getCity() == null ? "N/A" : address.getCity().getCountry() == null ? "N/A" : address.getCity()
				.getCountry().getName() == null ? "N/A" : address.getCity().getCountry().getName();
		return String.format("%s-%s-%s", name, city, country);
	}

}
