import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Plant} from '../../Interfaces/Plants/plant';
import {TranslatePipe} from "@ngx-translate/core";
import {AddPlantComponent} from './add-plant-component/add-plant-component';
import {PlantsCollectionService} from '../plants-collection-service';
import {PlantComponent} from './plant-component/plant-component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-plants-list-component',
  imports: [
    TranslatePipe,
    PlantComponent
  ],
  templateUrl: './plants-list-component.html',
  styleUrl: './plants-list-component.css'
})
export class PlantsListComponent {
  @Input() plants: Plant[] = [];
  selectedPlant: number = -1;
  @Output() plantsChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() createPlant: EventEmitter<Plant>= new EventEmitter<Plant>();
  @Input() localizationId: number | undefined = undefined;

  constructor(private plantCollectionService: PlantsCollectionService,
              private modalService: NgbModal) {}

  selectPlant(plantId: number): void {this.plantsChange.emit(plantId); this.selectedPlant= plantId;}

  onUploadPlant(plant: Plant): void {
    plant.localization = {
      ...plant.localization,
      id: this.localizationId!
    };
    this.plantCollectionService.createPlant(plant).subscribe(
      {next: (_plant: Plant):void => {this.createPlant.emit(_plant);}}
    )
  }

  addPlant(): void {
    const modalRef: NgbModalRef = this.modalService.open(AddPlantComponent);

    modalRef.result.then((result: Plant): void => {this.onUploadPlant(result);}
    );
  }
}
