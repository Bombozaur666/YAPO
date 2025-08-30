package com.example.YAPO.models.plant;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "plant_updates")
public class PlantUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference(value = "plant-plantupdate")
    @ManyToOne(cascade = CascadeType.ALL)
    private Plant plant;

    @Column
    private String fieldName;

    @Column
    private String oldValue;

    @Column
    private String newValue;
}
