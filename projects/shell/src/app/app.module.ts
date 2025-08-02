import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects, AuthInterceptor, authReducer, LoaderSpinnerModule, ModalErrorModule } from '@commons-lib';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ auth: authReducer }),
    AutoCompleteModule,
    BrowserAnimationsModule,
    TieredMenuModule,
    ButtonModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects]),
    LoaderSpinnerModule,
    ModalErrorModule
],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
