package com.example.YAPO.controlers.plant;

import com.example.YAPO.models.User.MyUserDetails;
import com.example.YAPO.models.plant.Note;
import com.example.YAPO.service.plant.NoteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/plants/{plantId}/note")
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("")
    public ResponseEntity<Note> createNotePage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable Long plantId, @RequestBody @Valid Note note) {
        Note _note = noteService.createNote(plantId, note, userDetails.getUser());
        return ResponseEntity.ok(_note);
    }

    @DeleteMapping("/{idNote}")
    public ResponseEntity<?> deleteNotePage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable Long plantId, @PathVariable Long idNote) {
        boolean isDeleted = noteService.deleteNoteById(plantId, idNote, userDetails.getUser().getId());
        return isDeleted ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PatchMapping("")
    public ResponseEntity<Note> updateNotePage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable Long plantId, @RequestBody @Valid Note note) {
        Note _note = noteService.updateNote(plantId, userDetails.getUser().getId(), note);
        return ResponseEntity.ok(_note);
    }
}
