import { Component } from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-notes-component',
    imports: [
        TranslatePipe
    ],
  templateUrl: './notes-component.html',
  styleUrl: './notes-component.css'
})
export class NotesComponent {

}
