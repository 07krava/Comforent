package org.comforent.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.comforent.enums.HousingType;
import org.hibernate.Hibernate;

import java.math.BigDecimal;
import java.util.*;

@Entity
@Getter
@Setter
@ToString
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "housing")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Housing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "quantity_bedrooms")
    private Integer bedRooms;

    @Column(name ="quantity_beds")
    private Integer beds;

    @Column(name = "quantity_bathrooms")
    private Integer bathRooms;

    @Column(name = "description")
    private String description;

    @JsonIgnore
    @OneToOne(mappedBy = "housing", cascade = CascadeType.ALL)
    private Location location;

    @Column(name = "title")
    private String title;

    @Column(name = "is_active", columnDefinition = "BOOLEAN DEFAULT true")
    @Builder.Default
    private boolean isActive = true;

    @Column(name = "max_amount_people")
    private Integer maxAmountPeople;

    @JsonIgnore
    @OneToMany(mappedBy = "housing", cascade = CascadeType.ALL)
    @ToString.Exclude
    @Builder.Default
    private List<Photo> photos = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "housing_type")
    private HousingType housingType;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    @ToString.Exclude
    private User owner;

    @JsonIgnore
    @OneToMany(mappedBy = "housing", cascade = CascadeType.ALL)
    @ToString.Exclude
    @Builder.Default
    private Set<Booking> bookings = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Housing housing = (Housing) o;
        return id != null && Objects.equals(id, housing.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
