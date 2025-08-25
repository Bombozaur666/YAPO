package com.example.YAPO.models.plant;

import com.example.YAPO.models.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "localizations")
public class Localization {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JsonIgnore
    private User user;

    @JsonManagedReference(value = "localization-plant")
    @OneToMany(mappedBy = "localization", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Plant> plants;
}
