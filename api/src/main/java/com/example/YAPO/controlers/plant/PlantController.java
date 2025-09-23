package com.example.YAPO.controlers.plant;

import com.example.YAPO.models.*;
import com.example.YAPO.models.User.MyUserDetails;
import com.example.YAPO.models.plant.Plant;
import com.example.YAPO.service.plant.PlantAvatarService;
import com.example.YAPO.service.plant.PlantService;
import jakarta.validation.Valid;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/plants")
public class PlantController {

    private final PlantService plantService;
    private final PlantAvatarService plantAvatarService;

    public PlantController(PlantService plantService, PlantAvatarService plantAvatarService) {
        this.plantService = plantService;
        this.plantAvatarService = plantAvatarService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Plant>>  plantsPage(@AuthenticationPrincipal MyUserDetails userDetails) {
        List<Plant> _plants = plantService.getAllPlants(userDetails.getUsername());
        return ResponseEntity.ok(_plants);
    }

    @PostMapping("/create-plant")
    public ResponseEntity<Plant> createPlantPage(@AuthenticationPrincipal MyUserDetails userDetails, @RequestBody @Valid Plant plant) throws NoSuchElementException{
        Plant _plant = plantService.createPlant(plant, userDetails.getUser());
        return ResponseEntity.ok(_plant);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plant> getPlantPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable long id) {
        Plant _plant = plantService.getPlant(id, userDetails.getUsername());
        return ResponseEntity.ok(_plant);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlantByIdPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable Long id) {
        boolean _isDeleted = plantService.deletePlant(id, userDetails.getUsername());
        return _isDeleted ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PatchMapping("/{id}/update")
    public ResponseEntity<Plant> updateFieldPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable Long id, @RequestBody @Valid UpdateField updateField) {
        Plant _plant = plantService.updateField(id, userDetails.getUser(), updateField);
        return ResponseEntity.ok(_plant);
    }

    @GetMapping("/shared/{id}")
    public ResponseEntity<Plant> sharedPlantPage(@PathVariable Long id) {
        Plant _plant = plantService.sharedPlant(id);
        return  ResponseEntity.ok(_plant);
    }

    @PostMapping(value = "/avatar/{plantId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Plant> uploadAvatar(
            @AuthenticationPrincipal MyUserDetails userDetails,
            @RequestParam("file") MultipartFile file,
            @PathVariable long plantId) throws Exception {
        Plant _plant = plantAvatarService.uploadAvatar(plantId, file, userDetails.getUser());
        return ResponseEntity.ok(_plant);
    }

    @GetMapping("/avatar/{fileName}")
    public ResponseEntity<Resource> getAvatar(@PathVariable String fileName) throws Exception {
        Path path = plantAvatarService.getAvatarPath(fileName);
        byte[] bytes = Files.readAllBytes(path);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(new ByteArrayResource(bytes));
    }
}
