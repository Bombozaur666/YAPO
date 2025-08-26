import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LocalizationWithoutPlants} from '../../Interfaces/Plants/localization';
import {Plant} from '../../Interfaces/Plants/plant';
import {TranslatePipe} from "@ngx-translate/core";
import {AddPlantComponent} from './add-plant-component/add-plant-component';
import {PlantsCollectionService} from '../plants-collection-service';

@Component({
  selector: 'app-plants-list-component',
  imports: [
    TranslatePipe,
    AddPlantComponent
  ],
  templateUrl: './plants-list.component.html',
  styleUrl: './plants-list.component.css'
})
export class PlantsListComponent {
  @Input() plants: Plant[] = [];
  @Output() plantsChange = new EventEmitter<number>();
  @Output() createPlant = new EventEmitter<Plant>();
  @Input() localizationId: number | undefined = undefined;

  constructor(private plantCollectionService: PlantsCollectionService) {
  }

  selectPlant(plant: Plant): void {
    this.plantsChange.emit(plant.id);
  }

  onUploadPlant(plant: Plant) {
    plant.localization = {
      ...plant.localization,
      id: this.localizationId!
    };
    console.log(plant);
    this.plantCollectionService.createPlant(plant).subscribe(
      {next: (newPlant: Plant) => {this.createPlant.emit(newPlant);}}
    )
  }
}
