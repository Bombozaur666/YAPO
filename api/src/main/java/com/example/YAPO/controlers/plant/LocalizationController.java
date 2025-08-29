package com.example.YAPO.controlers.plant;

import com.example.YAPO.models.User.MyUserDetails;
import com.example.YAPO.models.UpdateField;
import com.example.YAPO.models.plant.Localization;
import com.example.YAPO.service.plant.LocalizationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/localization")
public class LocalizationController {
    private final LocalizationService localizationService;

    public LocalizationController(LocalizationService localizationService) {
        this.localizationService = localizationService;
    }

    @GetMapping("/")
    public List<Localization> localizationsPage(@AuthenticationPrincipal MyUserDetails userDetails) {
        return localizationService.getAllLocalizationsByUsername(userDetails.getUsername());
    }

    @PostMapping("/create-localization")
    public Localization createLocalizationPage(@AuthenticationPrincipal MyUserDetails userDetails, @RequestBody Localization localization) {
        return localizationService.createLocalization(userDetails.getUser().getId(), localization);
    }
    
    @GetMapping("/{id}")
    public Localization getLocalizationByIdPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable long id) {
        return localizationService.getLocalizationByIdAndUsername(userDetails.getUsername(), id);
    }

    @PutMapping("/{id}")
    public Localization updateLocalizationPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable long id, @RequestBody @Valid UpdateField  updateField) {
        return localizationService.updateLocalization(userDetails.getUsername(), updateField, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteLocalizationPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable long id) {
        boolean response = localizationService.deleteByIdAndUsername(id, userDetails.getUsername());
        return ResponseEntity.ok(response);
    }
}
