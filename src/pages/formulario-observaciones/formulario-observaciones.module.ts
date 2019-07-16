import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormularioObservacionesPage } from './formulario-observaciones';

@NgModule({
  declarations: [
    FormularioObservacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(FormularioObservacionesPage),
  ],
})
export class FormularioObservacionesPageModule {}
