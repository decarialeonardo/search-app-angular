import { AppMaterialModule } from './app-material/app-material.module';
import { NgModule } from '@angular/core';
import { TruncatePipe } from './pipe/truncate.pipe';
import { HelperService } from './helpers/helper.service';
@NgModule({
  declarations: [TruncatePipe],
  imports: [AppMaterialModule],
  providers: [HelperService],
  bootstrap: [],
  exports: [AppMaterialModule, TruncatePipe],
})
export class SharedModule {}
