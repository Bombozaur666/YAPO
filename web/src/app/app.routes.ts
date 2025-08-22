import {Routes} from '@angular/router';
import {HomeComponent} from './home-component/home-component';
import {LoginComponent} from './auth/login-component/login-component';
import {ProfileComponent} from './auth/profile-component/profile-component';
import {RegisterComponent} from './auth/register-component/register-component';
import {authGuard} from './auth/auth-guard';

export const routes: Routes = [
  { path: '',
    component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];
