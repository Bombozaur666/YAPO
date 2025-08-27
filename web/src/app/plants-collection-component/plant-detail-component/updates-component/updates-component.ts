import {Component, Input} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {PlantUpdate} from '../../../Interfaces/Plants/plant-update';

@Component({
  selector: 'app-updates-component',
  imports: [
    TranslatePipe
  ],
  templateUrl: './updates-component.html',
  styleUrl: './updates-component.css'
})
export class UpdatesComponent {
  @Input() updates!: PlantUpdate[];

}
