import {Component, Input} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";

import {NgbActiveModal,  NgbModalModule,} from '@ng-bootstrap/ng-bootstrap';
import {UpdateField} from '../../../../Interfaces/update-field';
import {FormsModule} from '@angular/forms';
import {PlantLifeExpectancy} from '../../../../Interfaces/Plants/enums/PlantLifeExpectancy';
import {PlantCondition} from '../../../../Interfaces/Plants/enums/plantCondition';
import {PlantSoil} from '../../../../Interfaces/Plants/enums/PlantSoil';
import {PlantWatering} from '../../../../Interfaces/Plants/enums/PlantWatering';
import {PlantBerth} from '../../../../Interfaces/Plants/enums/PlantBerth';
import {PlantToxicity} from '../../../../Interfaces/Plants/enums/PlantToxicity';

@Component({
  selector: 'app-main-body-component',
  imports: [
    TranslatePipe,
    NgbModalModule,
    FormsModule
  ],
  templateUrl: './update-field-component.html',
  styleUrl: './update-field-component.css'
})
export class UpdateFieldComponent {
  @Input() title!: string ;
  @Input() typeData!: string;
  @Input() updateField: UpdateField = {} as UpdateField;
  @Input() options?: PlantLifeExpectancy[] | PlantCondition[] | PlantSoil[] | PlantWatering[] | PlantBerth[] | PlantToxicity[];
  constructor(public activeModal: NgbActiveModal) {}

  close(): void { this.activeModal.dismiss('user-cancel');}

  save(): void { this.activeModal.close(this.updateField);}
}
