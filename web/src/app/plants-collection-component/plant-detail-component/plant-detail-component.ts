import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Plant} from '../../Interfaces/Plants/plant';
import {PhotoGalleryComponent} from './photo-gallery-component/photo-gallery-component';
import {NotesComponent} from './notes-component/notes-component';
import {UpdatesComponent} from './updates-component/updates-component';
import {MainBodyComponent} from './main-body-component/main-body-component';
import {Note} from '../../Interfaces/Plants/note';

@Component({
  selector: 'app-plant-detail-component',
  imports: [
    PhotoGalleryComponent,
    NotesComponent,
    UpdatesComponent,
    MainBodyComponent
  ],
  templateUrl: './plant-detail-component.html',
  styleUrl: './plant-detail-component.css',
})
export class PlantDetailComponent {
  @Input() plant: Plant = {} as Plant;
  @Output() plantAvatarChange: EventEmitter<Plant> = new EventEmitter<Plant>();
  @Output() plantUpdate: EventEmitter<Plant> = new EventEmitter();
  @Output() removePlant: EventEmitter<Plant> = new EventEmitter();
  @Output() notesChange: EventEmitter<Note[]> = new EventEmitter();

  onPlantAvatarChange(plant: Plant): void {this.plantAvatarChange.emit(plant)}

  onRemovePlant(plant: Plant):void {this.removePlant.emit(plant);}

  onNotesChange(notes: Note[]):void {this.notesChange.emit(notes);}

  onPlantUpdate(plant: Plant):void {this.plantUpdate.emit(plant)}
}
