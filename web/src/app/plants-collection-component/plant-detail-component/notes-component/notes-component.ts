import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {Note} from '../../../Interfaces/Plants/note';
import {NoteComponent} from './note/note-component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AddNotesComponent} from './add-note-component/add-note-component';
import {PlantsCollectionService} from '../../plants-collection-service';

@Component({
  selector: 'app-notes-component',
  imports: [
    TranslatePipe,
    NoteComponent
  ],
  templateUrl: './notes-component.html',
  styleUrls: ['./notes-component.css', '../Card.css']
})
export class NotesComponent {
  @Input() plantId!: number;
  @Input() notes!: Note[];
  @Output() notesChanged: EventEmitter<Note[]> = new EventEmitter<Note[]>();

  constructor(private plantsCollectionService: PlantsCollectionService,
              private modalService: NgbModal) {}

  addNote(): void {
    const modalRef: NgbModalRef = this.modalService.open(AddNotesComponent);

    modalRef.result.then(
      (result: Note): void => {
        this.plantsCollectionService.addNote(this.plantId, result).subscribe({
           next: (data: Note): void => {
             this.notes.push(data);
             this.notesChanged.emit(this.notes);
           }
        });
      }
    );
  }

  onNoteChange(note: Note): void {
    this.plantsCollectionService.editNote(this.plantId, note).subscribe({
      next: (data: Note): void => {
        this.notes = this.notes.map((_note: Note): Note =>
          _note.id === note.id
          ? data
          :  _note
        );
        this.notesChanged.emit(this.notes);
      }
    });
  }

  onNoteDelete(note: Note): void {
    this.plantsCollectionService.deleteNote(this.plantId, note).subscribe({
      next: (): void => {
        this.notes = this.notes.filter((_note: Note): boolean =>
          _note.id !== note.id
        );
        this.notesChanged.emit(this.notes);
      }
    });
  }
}
