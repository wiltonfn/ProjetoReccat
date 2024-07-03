import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColetasPage } from './coletas.page';

const routes: Routes = [
  {
    path: '',
    component: ColetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColetasPageRoutingModule {}
