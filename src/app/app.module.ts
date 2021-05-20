import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ItemCardComponent } from './item-card/item-card.component';
import { SearchComponent } from './search/search.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FavoriteDialogComponent } from './favorite-dialog/favorite-dialog.component';
import { CatalogComponent } from './catalog/catalog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { getInitialState, initialReducerMap } from './app.state';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppParameters } from './app.parameters';
@NgModule({
  declarations: [
    AppComponent,
    ItemCardComponent,
    SearchComponent,
    FavoriteDialogComponent,
    CatalogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    InfiniteScrollModule,
    StoreModule.forRoot(initialReducerMap, { initialState: getInitialState }),
    StoreDevtoolsModule.instrument({
      name: 'app store',
      maxAge: 25,
    }),
  ],
  entryComponents: [FavoriteDialogComponent],
  providers: [ApiService, AppParameters],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
