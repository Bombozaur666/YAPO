import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-updates-component',
  imports: [
    TranslatePipe
  ],
  templateUrl: './updates-component.html',
  styleUrl: './updates-component.css'
})
export class UpdatesComponent {

}
