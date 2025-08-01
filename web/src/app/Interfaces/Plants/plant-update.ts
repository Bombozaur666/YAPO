import {Plant} from './plant';

export interface PlantUpdate {
  id: number;
  plant: Plant;
  oldValue: string;
  newValue: string;
}
