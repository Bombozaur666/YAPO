import {Component, Input} from '@angular/core';
import {PhotoGallery} from '../../../../Interfaces/Plants/photo-gallery';

@Component({
  selector: 'app-photo-component',
    imports: [],
  templateUrl: './photo-component.html',
  styleUrl: './photo-component.css'
})
export class PhotoComponent {
  @Input() photo!: PhotoGallery;
}
