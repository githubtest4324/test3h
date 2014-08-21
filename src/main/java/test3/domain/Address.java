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

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Address implements Serializable {
	private static final long serialVersionUID = 1L;

	@Transient
	private AddressComputed computed = new AddressComputed(this);

	public static final String ID = "id";
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private long id;

	public static final String NAME = "name";
	private String name;

	public static final String CITY = "city";
	@ManyToOne
	private City city;

	public static final String STATE = "state";
	@ManyToOne
	private State state;

	public static final String AS_STRING = "asString";

	public String getAsString() {
		return computed.getAsString();
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}

		Address order = (Address) o;

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

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
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
