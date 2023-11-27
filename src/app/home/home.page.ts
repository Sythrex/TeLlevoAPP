import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuarioActual: { nombre: string; contrasena: string; tieneAuto: boolean; solicitudes: string[] } | undefined;
  conductoresConAuto: { nombre: string; contrasena: string; tieneAuto: boolean }[] = [];
  pasajeros: { nombre: string; contrasena: string; tieneAuto: boolean }[] = [];
  solicitudesPendientes: { pasajero: string; conductor: string }[] = [];

  constructor(private router: Router, private usuarioService: UsuarioService) {}


// En home.page.ts
ionViewWillEnter() {
  // Obtener el usuario actual (el que ha iniciado sesión)
  this.usuarioActual = this.usuarioService.obtenerUsuarioActual();

  // Actualizar la lista de conductores, pasajeros y solicitudes al entrar en la vista
  if (this.usuarioActual) {
    if (this.usuarioActual.tieneAuto) {
      // El usuario tiene un vehículo, mostrar la lista de pasajeros y solicitudes
      this.pasajeros = this.usuarioService.obtenerPasajeros();

    } else {
      // El usuario no tiene un vehículo, mostrar la lista de conductores y solicitudes
      this.conductoresConAuto = this.usuarioService.obtenerConductores();

    }
  }
}
aceptarViaje(): void {
  // Lógica para solicitar un viaje
  // Aquí puedes implementar la lógica necesaria, como enviar una solicitud a los conductores, etc.
  alert('Aceptando viaje del pasajero...');
  this.router.navigate(['/viajecondu']);
}
  

solicitarViaje(): void {
  // Lógica para solicitar un viaje
  // Aquí puedes implementar la lógica necesaria, como enviar una solicitud a los conductores, etc.
  alert('Solicitando viaje...');
  this.router.navigate(['/viaje']);
}
  

  irARegistro() {
    // Utiliza el router para navegar a la página de registro
    this.router.navigate(['/registro']);
  }

// home.page.ts
cerrarSesion(): void {
  this.usuarioActual = undefined;
  localStorage.removeItem('usuarioActual');
  this.conductoresConAuto = [];
  this.pasajeros = [];
  this.router.navigate(['/login']); // Ajusta la ruta según tu configuración
}
get saludoUsuario(): string {
  return this.usuarioActual?.tieneAuto ? '¡Bienvenido Conductor!' : '¡Bienvenido Pasajero!'; 
}
  
}