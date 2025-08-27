import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {Plant} from '../../../Interfaces/Plants/plant';
import {UploadImageDialogComponent} from '../../../shared/upload-image-dialog-component/upload-image-dialog-component';
import {PlantsCollectionService} from '../../plants-collection-service';

@Component({
  selector: 'app-main-body-component',
  imports: [
    TranslatePipe,
    UploadImageDialogComponent
  ],
  templateUrl: './main-body-component.html',
  styleUrl: './main-body-component.css'
})
export class MainBodyComponent {
  @Input() plant: Plant = {} as Plant;
  @Output() plantAvatarChange: EventEmitter<Plant> = new EventEmitter();
  @Output() removePlant: EventEmitter<Plant> = new EventEmitter();

  constructor(private plantsCollectionService: PlantsCollectionService) {}

  get avatarPath(): string {return this.plantsCollectionService.avatarPath(this.plant);}

  onPlantAvatarChange(plantAvatar: File) {
    this.plantsCollectionService.updatePlantAvatar(plantAvatar, this.plant.id).subscribe({
      next: (data: Plant) => {
        this.plant = data;
        return this.plantAvatarChange.emit(data);
      }
    });
  };

  onRemovePlant() {this.removePlant.emit(this.plant);}
}
