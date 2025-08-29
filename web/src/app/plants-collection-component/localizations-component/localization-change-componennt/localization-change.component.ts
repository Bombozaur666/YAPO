import {Component, Input} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {LocalizationWithoutPlants} from '../../../Interfaces/Plants/localization';
import {FormsModule} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-localization-change-component',
  imports: [
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './localization-change.component.html',
  styleUrl: './localization-change.component.css'
})
export class LocalizationChangeComponent {
  @Input() localization: LocalizationWithoutPlants = {"name": ""};
  @Input() title: string = "";

  constructor(public activeModal: NgbActiveModal) {}

  close(): void { this.activeModal.dismiss('user-cancel');}

  save(): void {this.activeModal.close({"mode": "add", "localization": this.localization});}

  delete(): void {this.activeModal.close({"mode": "delete", "localization": this.localization});}
}
