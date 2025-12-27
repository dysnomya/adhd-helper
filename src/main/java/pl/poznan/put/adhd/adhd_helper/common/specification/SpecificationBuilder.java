package pl.poznan.put.adhd.adhd_helper.common.specification;

import jakarta.persistence.metamodel.SingularAttribute;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;

import org.springframework.data.jpa.domain.Specification;

import java.util.Collection;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SpecificationBuilder<T> {
    private Specification<T> specification;

    public static <T> SpecificationBuilder<T> from(Specification<T> spec) {
        return new SpecificationBuilder<>(spec);
    }

    public static <T> SpecificationBuilder<T> empty() {
        return new SpecificationBuilder<>(Specification.unrestricted());
    }

    public SpecificationBuilder<T> and(Specification<T> specification) {
        this.specification = this.specification.and(specification);
        return this;
    }

    public SpecificationBuilder<T> or(Specification<T> specification) {
        this.specification = this.specification.or(specification);
        return this;
    }

    public <V> SpecificationBuilder<T> eq(SingularAttribute<T, V> attribute, V value) {
        if (value == null) {
            return this;
        }

        Specification<T> spec = (root, query, cb) -> cb.equal(root.get(attribute), value);
        this.specification = this.specification.and(spec);
        return this;
    }

    public <V> SpecificationBuilder<T> in(SingularAttribute<T, V> attribute, Collection<V> values) {
        if (values == null || values.isEmpty()) {
            return this;
        }

        Specification<T> spec = (root, query, cb) -> root.get(attribute).in(values);
        this.specification = this.specification.and(spec);
        return this;
    }

    public <V extends Comparable<? super V>> SpecificationBuilder<T> before(
            SingularAttribute<T, V> attribute, V value) {
        if (value == null) {
            return this;
        }

        Specification<T> spec =
                (root, query, cb) -> cb.lessThanOrEqualTo(root.get(attribute), value);
        this.specification = this.specification.and(spec);
        return this;
    }

    public <V extends Comparable<? super V>> SpecificationBuilder<T> after(
            SingularAttribute<T, V> attribute, V value) {
        if (value == null) {
            return this;
        }

        Specification<T> spec =
                (root, query, cb) -> cb.greaterThanOrEqualTo(root.get(attribute), value);
        this.specification = this.specification.and(spec);
        return this;
    }

    public SpecificationBuilder<T> isNull(SingularAttribute<? super T, ?> attribute) {
        Specification<T> spec = (root, query, cb) -> cb.isNull(root.get(attribute));
        this.specification = this.specification.and(spec);
        return this;
    }

    public Specification<T> build() {
        return this.specification;
    }
}
