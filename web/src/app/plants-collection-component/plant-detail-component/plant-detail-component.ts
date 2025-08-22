import {Component, Input} from '@angular/core';
import {Plant} from '../../Interfaces/Plants/plant';
import {DatePipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-plant-detail-component',
  imports: [
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './plant-detail-component.html',
  styleUrl: './plant-detail-component.css'
})
export class PlantDetailComponent {
  @Input() plant: Plant = {} as Plant;
}
