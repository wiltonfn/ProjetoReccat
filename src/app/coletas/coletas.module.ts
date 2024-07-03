import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColetasPageRoutingModule } from './coletas-routing.module';

import { ColetasPage } from './coletas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColetasPageRoutingModule
  ],
  declarations: [ColetasPage]
})
export class ColetasPageModule {}
