import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {Plant} from '../../../Interfaces/Plants/plant';

@Component({
  selector: 'app-main-body-component',
    imports: [
        TranslatePipe
    ],
  templateUrl: './main-body-component.html',
  styleUrl: './main-body-component.css'
})
export class MainBodyComponent {
  @Input() plant: Plant = {} as Plant;
  @Output() plantAvatarChane: EventEmitter<Plant> = new EventEmitter();

  protected url: string = "http://localhost:8080";

}
