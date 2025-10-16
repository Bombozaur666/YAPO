import {Component, Input} from '@angular/core';
import {CommentComponent} from './comment-component/comment-component';
import {PlantComment} from '../../../Interfaces/Plants/plantComment';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-comments-component',
  imports: [
    CommentComponent,
    TranslatePipe,
  ],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css', '../../../shared/Card.css']
})
export class CommentsComponent {
  @Input() plantComments: PlantComment[] = [] as PlantComment[] ;

  addComment(): void {

  }
}
