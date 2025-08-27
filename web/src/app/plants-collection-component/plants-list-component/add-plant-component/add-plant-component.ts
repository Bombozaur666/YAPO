import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {Plant} from '../../../Interfaces/Plants/plant';
import {PlantCondition} from '../../../Interfaces/Plants/enums/plantCondition';
import {PlantSoil} from '../../../Interfaces/Plants/enums/PlantSoil';
import {PlantWatering} from '../../../Interfaces/Plants/enums/PlantWatering';
import {PlantBerth} from '../../../Interfaces/Plants/enums/PlantBerth';
import {PlantToxicity} from '../../../Interfaces/Plants/enums/PlantToxicity';
import {PlantLifeExpectancy} from '../../../Interfaces/Plants/enums/PlantLifeExpectancy';

@Component({
  selector: 'app-add-plant-component',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslatePipe
    ],
  templateUrl: './add-plant-component.html',
  styleUrl: './add-plant-component.css'
})
export class AddPlantComponent {
  @Input() plant: Plant = {"alive": true} as Plant;
  @Output() save: EventEmitter<Plant> = new EventEmitter<Plant>();

  onSubmit():void {this.save.emit(this.plant)}

  protected readonly plantConditions: PlantCondition[] = Object.values(PlantCondition);
  protected readonly plantSoil: PlantSoil[] = Object.values(PlantSoil);
  protected readonly plantWatering: PlantWatering[] = Object.values(PlantWatering);
  protected readonly plantBerth: PlantBerth[] = Object.values(PlantBerth);
  protected readonly plantToxicity: PlantToxicity[] = Object.values(PlantToxicity);
  protected readonly plantLifeExpectancy: PlantLifeExpectancy[] = Object.values(PlantLifeExpectancy);
}
