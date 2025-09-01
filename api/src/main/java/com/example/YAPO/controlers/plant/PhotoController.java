package com.example.YAPO.controlers.plant;

import com.example.YAPO.models.User.MyUserDetails;
import com.example.YAPO.models.plant.PhotoGallery;
import com.example.YAPO.service.plant.PhotoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plants/{id}/photo")
public class PhotoController {
    private final PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @PostMapping("")
    public ResponseEntity<PhotoGallery> addPhotoPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable Long id, @RequestBody @Valid PhotoGallery photoGallery) {
        PhotoGallery photo = photoService.createPhoto(id, userDetails.getUser(), photoGallery);
        return ResponseEntity.ok(photo);
    }

    @GetMapping("")
    public ResponseEntity<List<PhotoGallery>> getAllPhotosPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable Long id) {
        List<PhotoGallery> photoGallery = photoService.getPhotos(id, userDetails.getUser());
        return ResponseEntity.ok(photoGallery);
    }

    @PatchMapping("/{photoId}")
    public ResponseEntity<PhotoGallery> updatePhotoPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable Long photoId, @RequestBody PhotoGallery photoGallery) {
        PhotoGallery photo = photoService.updatePhoto(userDetails.getUser(), photoId, photoGallery);
        return ResponseEntity.ok(photo);
    }
}
