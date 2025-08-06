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
import { AuthEffects, AuthInterceptor, authReducer, CartEffects, cartReducer, LoaderSpinnerModule, ModalErrorModule } from '@commons-lib';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChipModule } from 'primeng/chip';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({
      auth: authReducer,
      cart: cartReducer
    }),
    AutoCompleteModule,
    BrowserAnimationsModule,
    TieredMenuModule,
    ButtonModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects, CartEffects]),
    LoaderSpinnerModule,
    ModalErrorModule,
    BadgeModule,
    OverlayPanelModule,
    ChipModule
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
