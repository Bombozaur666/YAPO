import {Component, Input} from '@angular/core';
import {PlantComment} from '../../../../Interfaces/Plants/plantComment';
import {DatePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-comment-component',
  imports: [
    TranslatePipe,
    DatePipe
  ],
  templateUrl: './comment-component.html',
  styleUrls: ['./comment-component.css', '../../../../shared/Card.css']
})
export class CommentComponent {
  @Input() plantComment!: PlantComment;
}
