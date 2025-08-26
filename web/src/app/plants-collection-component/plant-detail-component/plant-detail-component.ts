import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Plant} from '../../Interfaces/Plants/plant';
import {TranslatePipe} from '@ngx-translate/core';
import {UploadImageDialogComponent} from '../../shared/upload-image-dialog-component/upload-image-dialog-component';
import {PhotoGalleryComponent} from './photo-gallery-component/photo-gallery-component';
import {NotesComponent} from './notes-component/notes-component';
import {UpdatesComponent} from './updates-component/updates-component';
import {MainBodyComponent} from './main-body-component/main-body-component';

@Component({
  selector: 'app-plant-detail-component',
  imports: [
    TranslatePipe,
    UploadImageDialogComponent,
    PhotoGalleryComponent,
    NotesComponent,
    UpdatesComponent,
    MainBodyComponent
  ],
  templateUrl: './plant-detail-component.html',
  styleUrl: './plant-detail-component.css'
})
export class PlantDetailComponent {

  @Input() plant: Plant = {} as Plant;
  @Output() plantAvatarChange = new EventEmitter<File>();

  onPlantAvatarChange(plantAvatar: File) {return this.plantAvatarChange.emit(plantAvatar);}
}
