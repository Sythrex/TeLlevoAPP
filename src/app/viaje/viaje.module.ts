// viaje.module.ts
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ViajeComponent } from './viaje.component';

@NgModule({
  declarations: [ViajeComponent],
  imports: [
    IonicModule, // Asegúrate de tener esta importación
    CommonModule // También es posible que necesites CommonModule dependiendo de la estructura de tu componente
  ],
  exports: [ViajeComponent]
})
export class ViajeModule {}
