import { Component, OnInit } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { User } from 'models/user';
import { AuthService } from 'services/auth.service';
import { PrimeNGConfig } from 'primeng/api';
import { TranslationService } from 'helpers/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'e-commerce-store';
  user: User;
  languages = [{ name: 'ar' }, { name: 'en' }];
  public isCollapsed = true;
  current: string;
  uiDirection: Direction | 'auto';

  constructor(
    private primengConfig: PrimeNGConfig,
    private authenticationService: AuthService,
    private translationService: TranslationService
  ) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit() {
    this.currentLang();
    this.changeLanguage(this.current);

    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };
  }

  /**
   * Gets or sets the current selected language.
   */
  currentLang() {
    return (this.current = this.translationService.language);
  }

  /**
   * Change language language.
   */
  async changeLanguage(language: any) {
    let lang = '';
    lang = language?.value ? language.value : language;
    console.log('lang', lang);
    console.log('uiDirection', this.uiDirection);
    await this.translationService.setLanguage(lang);
    console.log('setLanguage', this.translationService.setLanguage(lang));

    await this.currentLang();
    console.log('currentLang', this.currentLang());
    console.log('bbbbb', this.translationService.language);
  }

  /**
   * Gets the ui direction according to the current user display language write direction.
   */

  logout() {
    this.authenticationService.logout();
  }
}
