package com.example.YAPO.service.plant;

import com.example.YAPO.models.User.User;
import com.example.YAPO.models.enums.ErrorList;
import com.example.YAPO.models.plant.PhotoGallery;
import com.example.YAPO.models.plant.PhotoGalleryRequest;
import com.example.YAPO.models.plant.Plant;
import com.example.YAPO.repositories.plant.PhotoRepo;
import com.example.YAPO.repositories.plant.PlantRepo;
import jakarta.transaction.Transactional;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Service
public class PhotoService {
    private final PlantRepo plantRepo;
    private final PhotoRepo photoRepo;
    private static final Set<String> ALLOWED_TYPES = Set.of("image/jpeg","image/png","image/webp");

    private final String uploadDir = "uploads/plant/photoGallery/";

    public PhotoService(PlantRepo plantRepo, PhotoRepo photoRepo) {
        this.plantRepo = plantRepo;
        this.photoRepo = photoRepo;
    }

    @Transactional
    public Plant createPhoto(Long plantId, User user, Date date, String title, String description , MultipartFile image) throws IOException {

        Plant _plant = plantRepo.findByIdAndUser_Username(plantId, user.getUsername());
        PhotoGallery _photoGallery = new PhotoGallery();

        _photoGallery.setPlant(_plant);

        if (description != null) {_photoGallery.setDescription(description);}
        if (date != null) {_photoGallery.setDate(date);}
        if (title != null) {_photoGallery.setTitle(title);}


        if (image == null || image.isEmpty()) {throw new IllegalArgumentException("Empty file");}

        if (!ALLOWED_TYPES.contains(image.getContentType())) {
            throw new IllegalArgumentException("Unsupported file type");
        }

        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String original = image.getOriginalFilename() != null ? image.getOriginalFilename() : "avatar";
        String ext = original.contains(".") ? original.substring(original.lastIndexOf(".")) : ".jpg";
        String fileName = UUID.randomUUID() + "_" + original.replaceAll("\\s+","_");
        if (!fileName.endsWith(ext)) fileName += ext;

        Path destination = Paths.get(uploadDir).resolve(fileName).normalize();

        Files.copy(image.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

        _photoGallery.setImagePath(fileName);

        _plant.getPhotoGallery().add(_photoGallery);
        return plantRepo.save(_plant);
    }

    @Transactional
    public PhotoGallery updatePhoto(Long photoId, User user, PhotoGalleryRequest photoGalleryRequest) {
        PhotoGallery _photo = photoRepo.findByIdAndPlant_User_Id(photoId, user.getId());
        if (_photo != null) {
            _photo.setDescription(photoGalleryRequest.getDescription());
            _photo.setTitle(photoGalleryRequest.getTitle());
            try {
                _photo = photoRepo.save(_photo);
            } catch (DataIntegrityViolationException |
                     ConstraintViolationException | TransactionSystemException e) {
                throw new RuntimeException(ErrorList.ERROR_DURING_DATABASE_SAVING.toString());
            }
        } else  {
            throw new RuntimeException(ErrorList.PHOTO_NOT_FOUND.toString());
        }
        return _photo;
    }

    private Path getPhotoPath(String path) {return Paths.get(uploadDir).resolve(path).normalize();}

    public Path getPhoto(Long plantId, User user, String fileName) throws IOException {
        PhotoGallery _photoGallery = photoRepo
                .findByPlant_IdAndImagePathAndPlant_User_UsernameOrPlant_SharedAndPlant_IdAndImagePath(
                        plantId,
                        fileName,
                        user.getUsername(),
                        true,
                        plantId,
                        fileName);

        if (_photoGallery == null) { throw new RuntimeException(ErrorList.PHOTO_NOT_FOUND.toString()); }

        return getPhotoPath(_photoGallery.getImagePath());
    }

    @Transactional
    public void removePhoto(User user, Long photoId) {
        PhotoGallery _photo = photoRepo.findByIdAndPlant_User_Id(photoId, user.getId());
        if(_photo == null) {throw new RuntimeException(ErrorList.PHOTO_NOT_FOUND.toString());}
        photoRepo.delete(_photo);
        Path _path = Path.of(uploadDir).resolve(_photo.getImagePath()).normalize();
        File file = new File(_path.toUri());
        if (file.exists()) {
            file.delete();
        }
    }
}
