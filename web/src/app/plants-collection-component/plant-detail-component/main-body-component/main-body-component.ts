import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {Plant} from '../../../Interfaces/Plants/plant';
import {UploadImageDialogComponent} from '../../../shared/upload-image-dialog-component/upload-image-dialog-component';
import {PlantsCollectionService} from '../../plants-collection-service';
import {NgbModal, NgbModalModule, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-body-component',
  imports: [
    TranslatePipe,
    NgbModalModule
  ],
  templateUrl: './main-body-component.html',
  styleUrl: './main-body-component.css'
})
export class MainBodyComponent {
  @Input() plant: Plant = {} as Plant;
  @Output() plantAvatarChange: EventEmitter<Plant> = new EventEmitter();
  @Output() removePlant: EventEmitter<Plant> = new EventEmitter();

  constructor(private plantsCollectionService: PlantsCollectionService,
              private modalService: NgbModal) {}

  get avatarPath(): string {return this.plantsCollectionService.avatarPath(this.plant);}

  onPlantAvatarChange(plantAvatar: File): void {
    this.plantsCollectionService.updatePlantAvatar(plantAvatar, this.plant.id).subscribe({
      next: (data: Plant): void => {
        this.plant = data;
        return this.plantAvatarChange.emit(data);
      }
    });
  };

  onAvatarEdit(): void {
    const modalRef: NgbModalRef = this.modalService.open(UploadImageDialogComponent);

    modalRef.componentInstance.circled = false;
    modalRef.componentInstance.modalTitle = 'profile.settings.editAvatarTitle';

    modalRef.result.then((result: File): void => {this.onPlantAvatarChange(result);});
  }

  onRemovePlant(): void {this.removePlant.emit(this.plant);}
}
