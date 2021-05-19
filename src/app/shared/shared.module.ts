import { AppMaterialModule } from './app-material/app-material.module';
import { NgModule } from '@angular/core';
import { TruncatePipe } from './pipe/truncate.pipe';
@NgModule({
  declarations: [TruncatePipe],
  imports: [AppMaterialModule],
  providers: [],
  bootstrap: [],
  exports: [AppMaterialModule, TruncatePipe],
})
export class SharedModule {}
