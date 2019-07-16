import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspeccionPage } from './inspeccion';

@NgModule({
  declarations: [
    InspeccionPage,
  ],
  imports: [
    IonicPageModule.forChild(InspeccionPage),
  ],
})
export class InspeccionPageModule {}
