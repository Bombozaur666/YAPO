import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Note} from '../../../../Interfaces/Plants/note';
import {CommonModule, DatePipe} from '@angular/common';
import {NgbModal, NgbModalRef, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {TranslatePipe} from '@ngx-translate/core';
import {AddNotesComponent} from '../add-note-component/add-note-component';

@Component({
  selector: 'tr[app-note-component]',
  imports: [DatePipe, CommonModule, NgbTooltip, TranslatePipe],
  templateUrl: './note-component.html',
  styleUrl: './note-component.css',
  host: { class: 'table-row' },
  hostDirectives: [],
})
export class NoteComponent {
  @Input() note!: Note;
  @Output()  noteChanged: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() noteDelete: EventEmitter<Note> = new EventEmitter<Note>();
  constructor(private modalService: NgbModal) {}

  editNote(): void {
    const modalRef: NgbModalRef = this.modalService.open(AddNotesComponent);

    modalRef.componentInstance.note = this.note;

    modalRef.result.then((result: Note): void => {this.noteChanged.emit(result)});
  }

  deleteNote():void {this.noteDelete.emit(this.note);}
}
