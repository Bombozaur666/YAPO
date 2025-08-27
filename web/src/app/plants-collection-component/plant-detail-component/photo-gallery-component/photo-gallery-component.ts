import {Component, Input} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-photo-gallery-component',
    imports: [
        TranslatePipe
    ],
  templateUrl: './photo-gallery-component.html',
  styleUrl: './photo-gallery-component.css'
})
export class PhotoGalleryComponent {
  @Input() photo: any;

}
