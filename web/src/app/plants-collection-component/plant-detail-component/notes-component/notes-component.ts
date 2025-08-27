import {Component, Input} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {Note} from '../../../Interfaces/Plants/note';

@Component({
  selector: 'app-notes-component',
    imports: [
        TranslatePipe
    ],
  templateUrl: './notes-component.html',
  styleUrl: './notes-component.css'
})
export class NotesComponent {
  @Input() notes!: Note[];

}
