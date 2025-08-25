import {Component, EventEmitter, Output} from '@angular/core';
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
  protected plant: Plant = {"alive": true} as Plant;
  @Output() save = new EventEmitter<Plant>();

  onSubmit() {this.save.emit(this.plant)}

  protected readonly plantConditions = Object.values(PlantCondition);
  protected readonly plantSoil = Object.values(PlantSoil);
  protected readonly plantWatering = Object.values(PlantWatering);
  protected readonly plantBerth = Object.values(PlantBerth);
  protected readonly plantToxicity = Object.values(PlantToxicity);
  protected readonly plantLifeExpectancy = Object.values(PlantLifeExpectancy);
}
