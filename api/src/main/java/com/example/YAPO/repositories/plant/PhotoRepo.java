package com.example.YAPO.repositories.plant;

import com.example.YAPO.models.plant.PhotoGallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepo extends JpaRepository<PhotoGallery, Long> {
    PhotoGallery findByIdAndPlant_User_Id(Long id, Long plantUserId);

    PhotoGallery findByPlant_IdAndImagePath(Long plantId, String fileName);
}
