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
    public List<Plant> plantsPage(@AuthenticationPrincipal MyUserDetails userDetails) {
        return plantService.getAllPlants(userDetails.getUsername());
    }

    @PostMapping("/create-plant")
    public Plant createPlantPage(@AuthenticationPrincipal MyUserDetails userDetails, @RequestBody @Valid Plant plant) throws NoSuchElementException{
        return plantService.createPlant(plant, userDetails.getUser());
    }

    @GetMapping("/{id}")
    public Plant getPlantPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable long id) {
        return plantService.getPlant(id, userDetails.getUsername());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletePlantByIdPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable Long id) {
        return !plantService.deletePlant(id, userDetails.getUsername()) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/update")
    public  Plant updateFieldPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable Long id, @RequestBody @Valid UpdateField updateField) {
        return plantService.updateField(id, userDetails.getUser(), updateField);
    }

    @GetMapping("/shared/{id}")
    public Plant sharedPlantPage(@PathVariable Long id) {
        return  plantService.sharedPlant(id);
    }

    @PostMapping(value = "/avatar/{plantId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Plant> uploadAvatar(
            @RequestParam("file") MultipartFile file,
            @PathVariable long plantId) throws Exception {
        Plant _plant = plantAvatarService.uploadAvatar(plantId, file);
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
