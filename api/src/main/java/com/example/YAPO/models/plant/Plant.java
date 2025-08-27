package com.example.YAPO.models.plant;

import com.example.YAPO.models.User.User;
import com.example.YAPO.models.enums.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "plants")
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column()
    private String name;

    @Column()
    private String species;

    @Column()
    private Date purchaseDate;

    @Column()
    private String purchaseLocalization;

    @ManyToOne
    @JsonBackReference
    private User user;

    @JsonBackReference(value = "localization-plant")
    @ManyToOne
    private Localization localization;

    @JsonManagedReference(value = "plant-plantupdate")
    @OneToMany(mappedBy = "plant", cascade = CascadeType.ALL)
    private List<PlantUpdate> plantHistory;

    @JsonManagedReference(value = "plant-note")
    @OneToMany(mappedBy = "plant", cascade = CascadeType.ALL)
    private List<Note> notes;

    @JsonManagedReference(value = "plant-comment")
    @OneToMany(mappedBy = "plant", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @JsonManagedReference(value = "plant-photogallery")
    @OneToMany(mappedBy = "plant", cascade = CascadeType.ALL)
    private List<PhotoGallery> photoGallery;

    @Column()
    private Date fertilizationDate;

    @Column
    private boolean alive = true;

    @Column
    private boolean shared;

    @Column
    private String deathReason;

    @Column()
    private Date wateringDate;

    @Column()
    private Date creationDate = new Date();

    @Column
    private String avatarPath = "avatar_plant_default.png";

    @Column
    @Enumerated(EnumType.STRING)
    private PlantCondition plantCondition;

    @Column
    @Enumerated(EnumType.STRING)
    private PlantSoil plantSoil;

    @Column
    @Enumerated(EnumType.STRING)
    private PlantWatering plantWatering;

    @Column
    @Enumerated(EnumType.STRING)
    private PlantBerth plantBerth;

    @Column
    @Enumerated(EnumType.STRING)
    private PlantToxicity plantToxicity;

    @Column
    @Enumerated(EnumType.STRING)
    private PlantLifeExpectancy plantLifeExpectancy;

}
