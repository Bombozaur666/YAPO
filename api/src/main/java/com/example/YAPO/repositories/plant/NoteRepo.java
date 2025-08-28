package com.example.YAPO.repositories.plant;

import com.example.YAPO.models.plant.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepo extends JpaRepository<Note, Long> {

    void deleteByIdAndPlant_idAndPlant_User_Id(Long idNote, Long plantId, Long id);

    Note findByPlant_IdAndPlant_User_IdAndId(Long plantId, Long userId, long id);
}
