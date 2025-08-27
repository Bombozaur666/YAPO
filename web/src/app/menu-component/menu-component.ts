import {Component, EventEmitter, Output} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {AuthService} from '../auth/auth-service';

@Component({
  selector: 'app-menu-component',
    imports: [
        RouterLink,
        TranslatePipe
    ],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css'
})
export class MenuComponent {
  @Output() newLang: EventEmitter<string> = new EventEmitter<string>();
  constructor(protected authService: AuthService,
              protected router: Router) {}

  logout(): void {
    this.authService.logout();
  }

  changeLanguage(lang: string): void {
    this.newLang.emit(lang);
  }
}
