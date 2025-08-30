import {Component, Input} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {PlantUpdate} from '../../../Interfaces/Plants/plant-update';import {UpdateComponent} from './update/update-component';

@Component({
  selector: 'app-updates-component',
  imports: [
    TranslatePipe,
    UpdateComponent
  ],
  templateUrl: './updates-component.html',
  styleUrls: ['./updates-component.css', '../Card.css']
})
export class UpdatesComponent {
  @Input() updates!: PlantUpdate[];

}
