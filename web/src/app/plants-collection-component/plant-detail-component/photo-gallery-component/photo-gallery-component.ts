import {Component} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-photo-gallery-component',
    imports: [
        TranslatePipe
    ],
  templateUrl: './photo-gallery-component.html',
  styleUrls: ['./photo-gallery-component.css', '../Card.css']
})
export class PhotoGalleryComponent {}
