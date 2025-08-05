import { Routes } from '@angular/router';
import {HomeComponent} from './home-component/home-component';
import {LocalizationComponent} from './localization-component/localization-component';
import {PlantComponent} from './plant-component/plant-component';

export const routes: Routes = [
  { path: '',
    component: HomeComponent},
  { path: 'plants',
    component: PlantComponent},
  { path: 'localizations',
    component: LocalizationComponent},
];
