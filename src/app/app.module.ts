import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule para manejar formularios reactivos
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule para realizar solicitudes HTTP
import { RegistroComponent } from './registro/registro.component';
import { RegistroPageRoutingModule } from './registro/registro-routing.module';
import { LoginModule } from './login/login.module';  // Asegúrate de importar el módulo


@NgModule({
  declarations: [AppComponent, RegistroComponent], // Asegúrate de declarar tu componente aquí
  imports: [
    BrowserModule,
    FormsModule,
    LoginModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    RegistroPageRoutingModule,
    // ... otras importaciones
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
