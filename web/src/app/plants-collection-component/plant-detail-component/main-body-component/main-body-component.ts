import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {Plant} from '../../../Interfaces/Plants/plant';
import {UploadImageDialogComponent} from '../../../shared/upload-image-dialog-component/upload-image-dialog-component';
import {PlantsCollectionService} from '../../plants-collection-service';
import {NgbModal, NgbModalModule, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {UpdateFieldComponent} from './update-field-component/update-field-component';
import {UpdateField} from '../../../Interfaces/update-field';
import {DatePipe} from '@angular/common';
import {PlantCondition} from '../../../Interfaces/Plants/enums/plantCondition';
import {PlantSoil} from '../../../Interfaces/Plants/enums/PlantSoil';
import {PlantWatering} from '../../../Interfaces/Plants/enums/PlantWatering';
import {PlantBerth} from '../../../Interfaces/Plants/enums/PlantBerth';
import {PlantToxicity} from '../../../Interfaces/Plants/enums/PlantToxicity';
import {PlantLifeExpectancy} from '../../../Interfaces/Plants/enums/PlantLifeExpectancy';

@Component({
  selector: 'app-main-body-component',
  imports: [
    TranslatePipe,
    NgbModalModule,
    DatePipe
  ],
  templateUrl: './main-body-component.html',
  styleUrls: ['./main-body-component.css', '../../../shared/Card.css']
})
export class MainBodyComponent {
  @Input() plant: Plant = {} as Plant;
  @Output() plantAvatarChange: EventEmitter<Plant> = new EventEmitter();
  @Output() removePlant: EventEmitter<Plant> = new EventEmitter();
  @Output() plantUpdate: EventEmitter<Plant> = new EventEmitter();

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


  updateField(name: string, value: any, typeData: string, options?: PlantLifeExpectancy[] | PlantCondition[] | PlantSoil[] | PlantWatering[] | PlantBerth[] | PlantToxicity[]): void {
    const modalRef: NgbModalRef = this.modalService.open(UpdateFieldComponent);

    modalRef.componentInstance.title = "collections.plants.details." + name;
    modalRef.componentInstance.typeData = typeData;
    modalRef.componentInstance.updateField = {fieldName: name, fieldValue: value};
    options
      ? modalRef.componentInstance.options = options
      : null;

    modalRef.result.then(
      (result: UpdateField): void => {
        this.plantsCollectionService.updatePlantField(result, this.plant.id).subscribe({
          next: (data: Plant): void => {
            this.plantUpdate.emit(data);
          }
        })
      });
  }

  protected readonly plantConditions: PlantCondition[] = Object.values(PlantCondition);
  protected readonly plantSoil: PlantSoil[] = Object.values(PlantSoil);
  protected readonly plantWatering: PlantWatering[] = Object.values(PlantWatering);
  protected readonly plantBerth: PlantBerth[] = Object.values(PlantBerth);
  protected readonly plantToxicity: PlantToxicity[] = Object.values(PlantToxicity);
  protected readonly plantLifeExpectancy: PlantLifeExpectancy[] = Object.values(PlantLifeExpectancy);
}
