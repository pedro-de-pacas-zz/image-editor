import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers, metaReducers } from './reducers';
import { FormsModule } from '@angular/forms';
import { AngularDraggableModule } from 'angular2-draggable';
import { ImageFacade } from './facades/image.facade';
import { EffectsModule } from '@ngrx/effects';
import { GetImagesUrlsService } from './services/get-images-urls.service';
import { ImagesEffect } from './effects/images.effect';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularDraggableModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot(),
    FormsModule,
    EffectsModule.forRoot([ImagesEffect]),
  ],
  providers: [ImageFacade, GetImagesUrlsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
