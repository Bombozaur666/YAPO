package com.example.YAPO.models.plant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhotoGalleryRequest {
    private Date date;

    private MultipartFile image;

    private String title;

    private String description;
}
