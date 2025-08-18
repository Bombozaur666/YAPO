import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
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
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  changeLanguage(lang: string) {
    this.newLang.emit(lang);
  }
}
