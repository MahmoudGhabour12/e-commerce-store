import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

/**
 * The application translation service that contains functionality to set/get the current user language and translate any given tokens.
 */
@Injectable()
export class TranslationService {
  constructor(private translateService: TranslateService) {}

  /**
   * Gets or sets the current selected language.
   */
  get language(): string {
    return this.translateService.currentLang;
  }

  /**
   * Gets or sets the current selected language.
   * @param lang The language to be selected.
   */
  set language(lang: string) {
    this.translateService.use(lang);
  }

  /**
   * Initializes the system supported languages and sets the default language.
   * @param defaultLang The default language to be used, if not provided `ar` will be used.
   */
  initializeLanguages(defaultLang = 'ar') {
    this.translateService.addLangs(['ar', 'en']);
    this.translateService.use(defaultLang ?? 'ar');
  }

  /**
   * Sets the default language.
   * @param defaultLang The default language to be used, if not provided `ar` will be used.
   */
  setLanguage(defaultLang = 'ar') {
    this.translateService.use(defaultLang ?? 'ar');
  }

  /**
   * Instantly translates the given token into a localized version according to the current logged-in user's language.
   * @param value The token to be localized.
   * @param params Additional params to be sent to the translate service.
   * @returns The translated token.
   */
  translate(value: string | string[], params?: object): any {
    return this.translateService.instant(value, params);
  }

  /**
   * Translate the given token into a localized version according to the current logged-in user's language.
   * @param value The token to be localized.
   * @param params Additional params to be sent to the translate service.
   * @returns The translated token.
   */
  loadTranslation(value: string | string[], params?: object): Observable<any> {
    return this.translateService.get(value, params);
  }

  /**
   * Allows to reload the lang file from the file
   */
  reloadLanguage(value: string): Observable<any> {
    return this.translateService.reloadLang(value);
  }
}
