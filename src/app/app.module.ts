import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from '@angular/platform-browser/animations';
import { ApiService } from './shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ItemCardComponent } from './item-card/item-card.component';
import { SearchComponent } from './search/search.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FavoriteDialogComponent } from './favorite-dialog/favorite-dialog.component';
import { ItemsManagerComponent } from './items-manager/items-manager.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { getInitialState, initialReducerMap } from './app.state';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppParameters } from './app.parameters';
@NgModule({
  declarations: [
    AppComponent,
    ItemCardComponent,
    SearchComponent,
    FavoriteDialogComponent,
    ItemsManagerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    StoreModule.forRoot(initialReducerMap, { initialState: getInitialState }),
    StoreDevtoolsModule.instrument({
      name: 'app store',
      maxAge: 25
    })
  ],
  entryComponents: [FavoriteDialogComponent],
  providers: [ApiService, AppParameters],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
