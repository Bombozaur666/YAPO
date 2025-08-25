import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LocalizationWithoutPlants} from '../../Interfaces/Plants/localization';
import {Plant} from '../../Interfaces/Plants/plant';
import {TranslatePipe} from "@ngx-translate/core";
import {AddPlantComponent} from './add-plant-component/add-plant-component';

@Component({
  selector: 'app-plants-component',
  imports: [
    TranslatePipe,
    AddPlantComponent
  ],
  templateUrl: './plants-component.html',
  styleUrl: './plants-component.css'
})
export class PlantsComponent {
  @Input() plants: Plant[] = [];
  @Output() plantsChange = new EventEmitter<number>();

  selectLocalization(localization: LocalizationWithoutPlants): void {
    this.plantsChange.emit(localization.id);
  }
}
