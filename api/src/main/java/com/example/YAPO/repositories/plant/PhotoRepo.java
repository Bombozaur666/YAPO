package com.example.YAPO.repositories.plant;

import com.example.YAPO.models.plant.PhotoGallery;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepo extends JpaRepository<PhotoGallery, Long> {
    PhotoGallery findByIdAndPlant_User_Id(Long id, Long plantUserId);

    PhotoGallery findByPlant_IdAndImagePathAndPlant_User_UsernameOrPlant_SharedAndPlant_IdAndImagePath(Long plant_id,
                                                                                                       @NotNull String imagePath,
                                                                                                       @NotBlank @NotNull String plant_user_username,
                                                                                                       boolean plant_shared,
                                                                                                       Long plant_id2,
                                                                                                       @NotNull String imagePath2);
}
