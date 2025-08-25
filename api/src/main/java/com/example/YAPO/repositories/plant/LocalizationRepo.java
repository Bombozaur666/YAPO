package com.example.YAPO.repositories.plant;

import com.example.YAPO.models.plant.Localization;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocalizationRepo extends JpaRepository<Localization, Long> {
    List<Localization> findByUser_Username(String username);

    Localization findByIdAndUser_Username(Long Id,String userUsername);

    @Modifying
    @Transactional
    @Query("DELETE FROM Localization l WHERE l.id = :id AND l.user.username = :username")
    void deleteByIdAndUsername(@Param("id") long id, @Param("username") String username);
}
