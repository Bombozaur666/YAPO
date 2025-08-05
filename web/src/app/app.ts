import {Component, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  TranslateService,
  TranslateModule,
} from "@ngx-translate/core";
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, Menubar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Yapo');
  MenuItems: MenuItem[] = [];

  constructor(private translate: TranslateService, private titleService:Title) {
    this.translate.addLangs(['pl', 'en']);
    this.translate.setFallbackLang('pl');
    this.translate.use('pl');
    this.translate.get(["app.title.full"]).subscribe(
      translations => {this.titleService.setTitle(translations['app.title.full']);
      });
  }

  ngOnInit() {
    this.buildMenu();
    this.translate.onLangChange.subscribe(() => {
      this.buildMenu();
      this.translate.get(["app.title.full"]).subscribe(translations => {
        this.titleService.setTitle(translations['app.title.full']);
      });
    });
  }
  buildMenu() {
    this.translate.get(['menu.home', 'menu.plants', 'menu.localizations', 'menu.language.general', 'menu.language.pl', 'menu.language.en']).subscribe(
      translations => {
        this.MenuItems = [
          {
            label: translations['menu.home'],
            icon: 'pi pi-home',
            routerLink: ['/']
          },
          {
            label: translations['menu.plants'],
            icon: 'pi pi-home',
            routerLink: ['/plants/']
          },
          {
            label: translations['menu.localizations'],
            icon: 'pi pi-home',
            routerLink: ['/localizations/']
          },
          {
            label: translations['menu.language.general'],
            icon: 'pi pi-cloud',
            style: {'float': 'right'},
            items: [
              {
                label: translations['menu.language.pl'],
                icon: 'pi pi-cloud-download',
                command: () => {
                  this.changeLanguage("pl");
                }
              },
              {
                label: translations['menu.language.en'],
                icon: 'pi pi-cloud-upload',
                command: () => {
                  this.changeLanguage("en");
                }
              }
            ]
          }
        ];
    });
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
  }
}
