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
    public ResponseEntity<List<Localization>>  localizationsPage(@AuthenticationPrincipal MyUserDetails userDetails) {
        List<Localization> _locations = localizationService.getAllLocalizationsByUsername(userDetails.getUsername());
        return ResponseEntity.ok(_locations);
    }

    @GetMapping("/{id}")
    public  ResponseEntity<Localization> getLocalizationByIdPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable long id) {
        Localization _Localization = localizationService.getLocalizationByIdAndUsername(userDetails.getUsername(), id);
        return ResponseEntity.ok(_Localization);
    }

    @PutMapping("/{id}")
    public  ResponseEntity<Localization> updateLocalizationPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable long id, @RequestBody @Valid UpdateField  updateField) {
        Localization _Localization = localizationService.updateLocalization(userDetails.getUsername(), updateField, id);
        return ResponseEntity.ok(_Localization);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocalizationPage(@AuthenticationPrincipal MyUserDetails userDetails, @PathVariable long id) {
        boolean _isDeleted = localizationService.deleteByIdAndUsername(id, userDetails.getUsername());
        return _isDeleted ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PostMapping("/create-localization")
    public ResponseEntity<Localization> createLocalizationPage(@AuthenticationPrincipal MyUserDetails userDetails, @RequestBody Localization localization) {
        Localization _localization = localizationService.createLocalization(userDetails.getUser().getId(), localization);
        return ResponseEntity.ok(_localization);
    }
}
