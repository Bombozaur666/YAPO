import {Routes} from '@angular/router';
import {HomeComponent} from './home-component/home-component';
import {LoginComponent} from './auth/login-component/login-component';
import {ProfileComponent} from './auth/profile-component/profile-component';
import {RegisterComponent} from './auth/register-component/register-component';
import {authGuard} from './auth/auth-guard';
import {PlantsCollectionComponent} from './plants-collection-component/plants-collection-component';


export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'collection', component: PlantsCollectionComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
