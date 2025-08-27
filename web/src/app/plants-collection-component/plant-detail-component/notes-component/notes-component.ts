import {Component, Input} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {Note} from '../../../Interfaces/Plants/note';
import {AddNotesComponent} from './add-note-component/add-note-component';
import {NoteComponent} from './note/note-component';

@Component({
  selector: 'app-notes-component',
  imports: [
    TranslatePipe,
    AddNotesComponent,
    NoteComponent
  ],
  templateUrl: './notes-component.html',
  styleUrl: './notes-component.css'
})
export class NotesComponent {
  protected selectedNote?: Note = {} as Note;
  @Input() notes!: Note[];

  onSelectNote(selectedNote: Note) {
    this.selectedNote = selectedNote;
  }

  addNote() {
    this.selectedNote = {} as Note;
  }

  onEdit(note: Note) {
    this.selectedNote = note;
  }
}
