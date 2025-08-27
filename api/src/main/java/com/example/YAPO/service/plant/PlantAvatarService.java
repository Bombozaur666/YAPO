package com.example.YAPO.service.plant;

import com.example.YAPO.models.plant.Plant;
import com.example.YAPO.repositories.plant.PlantRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Service
public class PlantAvatarService {
    private final PlantRepo plantRepo;
    private static final Set<String> ALLOWED_TYPES = Set.of("image/jpeg","image/png","image/webp");

    private final String uploadDir = "uploads/plant/avatar/";

    private PlantAvatarService(PlantRepo plantRepo) {
        this.plantRepo = plantRepo;
    }

    public Plant uploadAvatar(long plantId, MultipartFile file) throws IOException {
        Plant plant = plantRepo.findById(plantId)
                .orElseThrow(() -> new EntityNotFoundException("Plant not found with id " + plantId));


        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Empty file");
        }
        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new IllegalArgumentException("Unsupported file type");
        }

        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String original = file.getOriginalFilename() != null ? file.getOriginalFilename() : "avatar";
        String ext = original.contains(".") ? original.substring(original.lastIndexOf(".")) : ".jpg";
        String fileName = UUID.randomUUID() + "_" + original.replaceAll("\\s+","_");
        if (!fileName.endsWith(ext)) fileName += ext;

        Path destination = Paths.get(uploadDir).resolve(fileName).normalize();

        if (plant.getAvatarPath() != null &&
            !plant.getAvatarPath().equals("avatar_plant_default.png")) {
            try {
                Files.deleteIfExists(Paths.get(uploadDir).resolve(plant.getAvatarPath()));
            } catch (Exception ignored) {}
        }

        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

        plant.setAvatarPath(fileName);
        return plantRepo.save(plant);
    }

    public Path getAvatarPath(String path) {
        return Paths.get(uploadDir).resolve(path).normalize();
    }
}
