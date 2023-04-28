import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { TranslationService } from 'helpers/translation.service';
import { AuthService } from 'services/auth.service';
import { User } from 'models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'e-commerce-store';
  user: User;
  languages = [{ name: 'ar' }, { name: 'en' }];
  public isCollapsed = true;
  current: string;

  isLoading: boolean = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private authenticationService: AuthService,
    private translationService: TranslationService
  ) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit() {
    /**
     * Get the current language.
     * Function to change the language.
     */
    this.translationService.initializeLanguages();
    this.currentLang();
    this.changeLanguage(this.current);

    /**
     * Primeng config to enhance design.
     */
    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlay panel
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
  changeLanguage(language: any) {
    let lang = '';
    lang = language?.value ? language.value : language;

    this.isLoading = true;
    setTimeout(async () => {
      this.translationService.setLanguage(lang);
      this.isLoading = false;
    }, 100);
  }

  /**
   * Gets the ui direction according to the current user display language write direction.
   */
  logout() {
    this.authenticationService.logout();
  }
}
