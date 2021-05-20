import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsManagerComponent } from './items-manage/items-manager.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: 'search',
    component: ItemsManagerComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
