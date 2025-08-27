import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {Note} from '../../../../Interfaces/Plants/note';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-note-component',
  imports: [
    TranslatePipe,
    DatePipe
  ],
  templateUrl: './note-component.html',
  styleUrl: './note-component.css'
})
export class NoteComponent {
  @Input() note!: Note;
  @Output() editNote = new EventEmitter<Note>();
  onEdit(): void {this.editNote.emit(this.note);}
}
