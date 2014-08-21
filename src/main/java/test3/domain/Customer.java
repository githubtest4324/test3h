package test3.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Customer implements Serializable {
	private static final long serialVersionUID = 1L;

	@Transient
	private CustomerComputed computed = new CustomerComputed(this);

	public static final String ID = "id";
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private long id;

	public static final String NAME = "name";
	private String name;

	public static final String ADDRESS = "address";
	@ManyToOne
	private Address address;

	public static final String AS_STRING = "asString";

	public String getAsString() {
		return computed.getAsString();
	}

	public void setAsString(String value) {
		computed.setAsString(value);
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}

		Customer order = (Customer) o;

		if (id != order.id) {
			return false;
		}

		return true;
	}

	@Override
	public int hashCode() {
		return (int) (id ^ (id >>> 32));
	}

	@Override
	public String toString() {
		return "Order{" + "id=" + id + "}";
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
