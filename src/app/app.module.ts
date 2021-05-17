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
    SharedModule,
  ],
  entryComponents: [FavoriteDialogComponent],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
