import {User} from '../Users/user';
import {Plant} from './plant';

export interface Comment {
  id: number;
  user: User;
  plant: Plant;
  visible: boolean;
  creationDate: Date;
  editDate?: Date;
  comment: string;
}
