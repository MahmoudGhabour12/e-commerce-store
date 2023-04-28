import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromStore from './store';
import * as fromAppStore from './shared/store';

/* Add support for internationalizations e.g. (currency, date). */
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
registerLocaleData(localeAr);

import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { ProductsListComponent } from './views/products-list/products-list.component';
import { UserProductsListComponent } from './views/user-products-list/user-products-list.component';
import { GeneralLoaderComponent } from './shared/components/general-loader/general-loader.component';

import { ErrorInterceptor } from 'helpers/error.interceptor';
import { fakeBackendProvider } from 'helpers/fake-backend';
import { JwtInterceptor } from 'helpers/jwt.interceptor';
import { MissingTranslationHelper } from 'helpers/missing-translation.helper';
import { TranslateHttpLoaderHelper } from 'helpers/translate-loader.helper';
import { TranslationService } from 'helpers/translation.service';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { BlockUIModule } from 'primeng/blockui';
import { DataViewModule } from 'primeng/dataview';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductsListComponent,
    UserProductsListComponent,
    GeneralLoaderComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forFeature('eCommerce', fromStore.reducers),
    EffectsModule.forFeature(fromStore.effects),
    StoreModule.forRoot(fromAppStore.reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: false,
        strictActionSerializability: false,
      },
    }),
    EffectsModule.forRoot(fromAppStore.effects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    TagModule,
    RatingModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    DataViewModule,
    SelectButtonModule,
    BlockUIModule,
    CardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderHelper,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MissingTranslationHelper,
      },
    }),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ar',
    },
    TranslationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
