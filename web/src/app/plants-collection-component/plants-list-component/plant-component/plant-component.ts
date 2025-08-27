import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Plant} from '../../../Interfaces/Plants/plant';
import {PlantsCollectionService} from '../../plants-collection-service';


@Component({
  selector: 'app-plant-component',
  imports: [],
  templateUrl: './plant-component.html',
  styleUrl: './plantscomponent.css'
})
export class PlantComponent {
  @Input() plant!: Plant;
  @Output() plantsChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private plantCollectionService: PlantsCollectionService) {
  }
  selectPlant():void {this.plantsChange.emit(this.plant.id)}

  get avatarPath(): string {return this.plantCollectionService.avatarPath(this.plant);}
}
