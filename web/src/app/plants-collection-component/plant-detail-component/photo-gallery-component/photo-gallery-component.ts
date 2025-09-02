import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {PhotoGallery} from '../../../Interfaces/Plants/photo-gallery';
import {PhotoComponent} from './photo-component/photo-component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {PlantsCollectionService} from '../../plants-collection-service';
import {UploadPhotoGalleryComponent} from '../../../shared/upload-photo-gallery-component/upload-photo-gallery-component';
import {PhotoGalleryRequest} from '../../../Interfaces/Plants/PhotoGalleryRequest';
import {Plant} from '../../../Interfaces/Plants/plant';

@Component({
  selector: 'app-photo-gallery-component',
  imports: [
    TranslatePipe,
    PhotoComponent
  ],
  templateUrl: './photo-gallery-component.html',
  styleUrls: ['./photo-gallery-component.css', '../../../shared/Card.css']
})
export class PhotoGalleryComponent {
  @Input() photoGallery: PhotoGallery[] = [] as PhotoGallery[];
  @Input() plantId!: number;
  @Output() plantUpdate: EventEmitter<Plant> = new EventEmitter();

  constructor(private modalService: NgbModal,
              private plantsCollectionService: PlantsCollectionService) {}

  uploadPhoto(): void {
    const modalRef: NgbModalRef = this.modalService.open(UploadPhotoGalleryComponent);

    modalRef.componentInstance.circled = false;
    modalRef.componentInstance.modalTitle = 'profile.settings.editAvatarTitle';

    modalRef.result.then(
      (result: PhotoGalleryRequest): void => {
        this.plantsCollectionService.addPhoto(result, this.plantId).subscribe({
          next: (data: Plant): void => {this.plantUpdate.emit(data);}
        });
      }
    );
  }

}
