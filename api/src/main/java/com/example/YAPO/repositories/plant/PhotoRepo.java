package com.example.YAPO.repositories.plant;

import com.example.YAPO.models.plant.PhotoGallery;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepo extends JpaRepository<PhotoGallery, Long> {
    PhotoGallery findByIdAndPlant_User_Id(Long id, Long plantUserId);

    PhotoGallery findByPlant_IdAndImagePathAndPlant_User_UsernameOrPlant_Shared(Long plantId, String fileName, @NotBlank @NotNull String username, boolean b);
}
