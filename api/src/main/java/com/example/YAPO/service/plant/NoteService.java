package com.example.YAPO.service.plant;

import com.example.YAPO.models.User.User;
import com.example.YAPO.models.enums.ErrorList;
import com.example.YAPO.models.plant.Note;
import com.example.YAPO.models.plant.Plant;
import com.example.YAPO.repositories.plant.NoteRepo;
import com.example.YAPO.repositories.plant.PlantRepo;
import jakarta.validation.Valid;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class NoteService {
    private final NoteRepo noteRepo;
    private final PlantRepo plantRepo;

    public NoteService(NoteRepo noteRepo, PlantRepo plantRepo) {
        this.noteRepo = noteRepo;
        this.plantRepo = plantRepo;
    }

    @Transactional
    public boolean deleteNoteById(Long plantId, Long noteId, Long userId) {
        noteRepo.deleteByIdAndPlant_idAndPlant_User_Id(noteId, plantId, userId);
        return !checkIExist(noteId);
    }

    private boolean checkIExist(long noteId) {return noteRepo.existsById(noteId);}

    @Transactional
    public Note updateNote(Long plantId, Long userId, @Valid Note note) {
        Note _note = noteRepo.findByPlant_IdAndPlant_User_IdAndId(plantId, userId, note.getId());

        _note.setNote(note.getNote());
        _note.setEditDate(new Date());

        try {
            _note = noteRepo.save(_note);
        } catch (DataIntegrityViolationException |
                 ConstraintViolationException | TransactionSystemException e) {
            throw new RuntimeException(ErrorList.ERROR_DURING_DATABASE_SAVING.toString());
        }

        return _note;
    }

    @Transactional
    public Note createNote(Long id, @Valid Note note, User user) {
        Plant _plant =  plantRepo.findByIdAndUser_Username(id, user.getUsername());
        if (_plant != null) {
            note.setPlant(_plant);
            try {
                note = noteRepo.save(note);
            } catch (DataIntegrityViolationException |
                     ConstraintViolationException | TransactionSystemException e) {
                throw new RuntimeException(ErrorList.ERROR_DURING_DATABASE_SAVING.toString());
            }

        }  else {
            throw new RuntimeException(ErrorList.PLANT_NOT_FOUND.toString());
        }
        return note;
    }
}
