import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {RegisterRequest} from '../../Interfaces/Users/user';
import {AuthService} from '../auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-component',
    imports: [
        FormsModule,
        TranslatePipe
    ],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})
export class RegisterComponent {
  protected registerForm: RegisterRequest = {username: '', password: '', email: ''};

  constructor(private authService: AuthService, private  router: Router) {}

  onSubmit() {
        this.authService.register(this.registerForm).subscribe(
          {next: () => {this.router.navigate(['/']);}}
        );
  }
}
