import { AppMaterialModule } from './app-material/app-material.module';
import { NgModule } from '@angular/core';
import { SearchPipe } from './pipes/search.pipe';
@NgModule({
  declarations: [SearchPipe],
  imports: [AppMaterialModule],
  providers: [],
  bootstrap: [],
  exports: [AppMaterialModule, SearchPipe],
})
export class SharedModule {}
