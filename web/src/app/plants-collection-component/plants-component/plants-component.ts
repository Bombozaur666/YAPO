import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LocalizationWithoutPlants} from '../../Interfaces/Plants/localization';
import {Plant} from '../../Interfaces/Plants/plant';

@Component({
  selector: 'app-plants-component',
  imports: [],
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
