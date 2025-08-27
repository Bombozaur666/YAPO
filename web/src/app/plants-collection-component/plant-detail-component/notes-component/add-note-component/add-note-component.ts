import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {Note} from '../../../../Interfaces/Plants/note';

@Component({
  selector: 'app-add-note-component',
  imports: [
    TranslatePipe
  ],
  templateUrl: './add-note-component.html',
  styleUrl: './add-note-component.css'
})
export class AddNotesComponent {
  @Output() addNote: EventEmitter<Note> = new EventEmitter();
  @Input() note?: Note = {} as Note;

  onSubmit(): void {
    console.log(this.note);
  }
}
