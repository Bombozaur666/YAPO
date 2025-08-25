import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LocalizationWithoutPlants} from '../../Interfaces/Plants/localization';
import {TranslatePipe} from '@ngx-translate/core';
import {LocalizationChangeComponent} from './localization-change-componennt/localization-change.component';

@Component({
  selector: 'app-localizations-component',
  imports: [
    TranslatePipe,
    LocalizationChangeComponent
  ],
  templateUrl: './localizations-component.html',
  styleUrl: './localizations-component.css'
})
export class LocalizationsComponent {
  protected selectedLocalization: LocalizationWithoutPlants = {"name": ""};
  @Input() localizations: LocalizationWithoutPlants[] = [];
  @Output() localizationsChange = new EventEmitter<number>();
  @Output() localizationUpdateOrCreate = new EventEmitter<LocalizationWithoutPlants>();
  @Output() localizationRemove = new EventEmitter<LocalizationWithoutPlants>();

  selectLocalization(localization: LocalizationWithoutPlants): void {
    this.selectedLocalization = localization;
    this.localizationsChange.emit(localization.id);
  }

  onUpdateOrCreate(localization: LocalizationWithoutPlants): void {
    this.localizationUpdateOrCreate.emit(localization);
  }

  onRemoveLocalization(localization: LocalizationWithoutPlants) {
    console.log("wykryło usuniecie - localization componenet",  localization);
    this.localizationRemove.emit(localization);
  }
}
