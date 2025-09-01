import {Component, Input} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {PhotoGallery} from '../../../Interfaces/Plants/photo-gallery';
import {PhotoComponent} from './photo-component/photo-component';

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
}
