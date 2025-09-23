package com.example.YAPO.controlers.plant;

import com.example.YAPO.models.User.MyUserDetails;
import com.example.YAPO.models.UpdateField;
import com.example.YAPO.models.plant.Comment;
import com.example.YAPO.service.plant.CommentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plants/{id}/comment")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {this.commentService = commentService;}

    @GetMapping("")
    public ResponseEntity<List<Comment>> getCommentsPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable Long id) {
        List<Comment> _comments = commentService.getComments(id, userDetails.getUser());
        return ResponseEntity.ok(_comments);
    }
    @PostMapping("")
    public ResponseEntity<Comment> createCommentPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable Long id, @RequestBody @Valid Comment comment) {
        Comment _comment = commentService.createComment(id, userDetails.getUser(), comment);
        return ResponseEntity.ok(_comment);
    }

    @PatchMapping("")
    public ResponseEntity<Comment> updateCommentPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable Long id, @RequestBody @Valid UpdateField  updateField) {
        Comment _comment = commentService.updateComment(id, updateField, userDetails.getUser());
        return ResponseEntity.ok(_comment);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteCommentPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable Long id, @PathVariable Long commentId) {
        boolean _isDeleted = commentService.deleteComment(id, commentId, userDetails.getUser());
        return  _isDeleted ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }
}
