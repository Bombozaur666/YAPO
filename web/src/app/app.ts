import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  TranslateService,
  TranslateModule,
  TranslatePipe
} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Yapo');

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['pl', 'en']);
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
