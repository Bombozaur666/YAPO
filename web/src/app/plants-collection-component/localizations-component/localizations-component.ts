import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LocalizationWithoutPlants} from '../../Interfaces/Plants/localization';

@Component({
  selector: 'app-localizations-component',
  imports: [],
  templateUrl: './localizations-component.html',
  styleUrl: './localizations-component.css'
})
export class LocalizationsComponent {
  @Input() localizations: LocalizationWithoutPlants[] = [];
  @Output() localizationsChange = new EventEmitter<number>();

  selectLocalization(localization: LocalizationWithoutPlants): void {
    this.localizationsChange.emit(localization.id);
  }
}
