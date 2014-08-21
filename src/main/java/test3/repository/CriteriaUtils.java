package test3.repository;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Junction;
import org.hibernate.criterion.Restrictions;

public class CriteriaUtils {
	public static void like(Criteria criteria, String values, String field) {
		if (values == null) {
			return;
		}
		if (values.length() > 0) {
			String[] propValues = values.split(";");
			Junction disjunction = Restrictions.disjunction();
			criteria.add(disjunction);
			for (int i = 0; i < propValues.length; i++) {
				String val = propValues[i];
				if (val.length() > 0) {
					Criterion subCriteria;
					subCriteria = Restrictions.ilike(field, "%" + val + "%");
					disjunction.add(subCriteria);
				}
			}
		}
	}

}
