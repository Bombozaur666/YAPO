import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {LocalizationWithoutPlants} from '../../../Interfaces/Plants/localization';
import {FormsModule} from '@angular/forms';

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
  @Input() modalId: number | undefined = undefined;
  @Input() localization: LocalizationWithoutPlants = {"name": ""};
  @Output() save = new EventEmitter<LocalizationWithoutPlants>();
  @Output() remove = new EventEmitter<LocalizationWithoutPlants>();

  onSubmit() {this.save.emit(this.localization!);}

  onRemove() {this.remove.emit(this.localization!);}
}
