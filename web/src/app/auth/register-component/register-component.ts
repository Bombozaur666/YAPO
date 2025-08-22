import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {LoginRequest, RegisterRequest, User} from '../../Interfaces/Users/user';
import {AuthService} from '../auth-service';

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

  constructor(private authService: AuthService) {
  }

  onSubmit() {
        this.authService.register(this.registerForm).subscribe(
          {
            next: (data: User) => {console.log(data);},
            error: error => {console.log(error.message);}
          }
        );
  }
}
