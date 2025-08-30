import {Component, Input} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {PlantUpdate} from '../../../../Interfaces/Plants/plant-update';

@Component({
  selector: 'tr[app-update-component]',
  imports: [
    TranslatePipe
  ],
  templateUrl: './update-component.html',
  styleUrls: ['./update-component.css', '../../Card.css']
})
export class UpdateComponent {
  @Input() update!: PlantUpdate;

}
