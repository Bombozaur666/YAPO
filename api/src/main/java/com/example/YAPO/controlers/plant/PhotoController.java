package com.example.YAPO.controlers.plant;

import com.example.YAPO.models.User.MyUserDetails;
import com.example.YAPO.models.plant.PhotoGallery;
import com.example.YAPO.models.plant.PhotoGalleryRequest;
import com.example.YAPO.models.plant.Plant;
import com.example.YAPO.service.plant.PhotoService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Date;

@RestController
@RequestMapping("/plants/{id}/photo")
public class PhotoController {
    private final PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @PostMapping(value = "",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Plant> addPhotoPage(
            @AuthenticationPrincipal MyUserDetails userDetails,
            @PathVariable Long id,
            @RequestParam(value = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("image") MultipartFile image) throws IOException {
        Plant plant = photoService.createPhoto(id, userDetails.getUser(), date, title, description , image);
        return ResponseEntity.ok(plant);
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> getAllPhotosPage(
            @AuthenticationPrincipal MyUserDetails userDetails,
            @PathVariable Long id,
            @PathVariable String fileName) throws IOException {

        Path path = photoService.getPhoto(id, userDetails.getUser(), fileName);
        String contentType = Files.probeContentType(path);
        Resource fileResource  = new InputStreamResource(Files.newInputStream(path));

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(fileResource );
    }

    @PatchMapping("/{photoId}")
    public ResponseEntity<PhotoGallery> updatePhotoPage(
            @AuthenticationPrincipal MyUserDetails userDetails,
            @PathVariable Long photoId,
            @RequestBody PhotoGalleryRequest photoGalleryRequest) {
        PhotoGallery photoGallery = photoService.updatePhoto(photoId, userDetails.getUser(), photoGalleryRequest);
        return ResponseEntity.ok(photoGallery);
    }

    @DeleteMapping("/{photoId}")
    public ResponseEntity<Void> deletePhotoPage(
            @AuthenticationPrincipal MyUserDetails userDetails,
            @PathVariable Long photoId) {
        photoService.removePhoto(userDetails.getUser(), photoId);
        return ResponseEntity.ok().build();
    }
}
