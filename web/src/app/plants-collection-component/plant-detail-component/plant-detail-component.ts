import {Component, Input} from '@angular/core';
import {Plant} from '../../Interfaces/Plants/plant';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-plant-detail-component',
  imports: [
    TranslatePipe
  ],
  templateUrl: './plant-detail-component.html',
  styleUrl: './plant-detail-component.css'
})
export class PlantDetailComponent {
  @Input() plant: Plant = {} as Plant;
}
