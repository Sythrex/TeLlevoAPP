// usuario.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
    obtenerUsuarioPorId(nombre: string) {
        throw new Error('Method not implemented.');
    }
  private readonly LOCAL_STORAGE_KEY = 'usuarios';
  private usuarios: { nombre: string; contrasena: string; tieneAuto: boolean; solicitudes: string[] }[] = [];
  private usuarioActual: { nombre: string; contrasena: string; tieneAuto: boolean; solicitudes: string[] } | undefined;

  constructor() {
    // Cargar usuarios desde el localStorage al iniciar el servicio
    const storedUsuarios = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    this.usuarios = storedUsuarios ? JSON.parse(storedUsuarios) : [];
  }

  registrarUsuario(nombre: string, contrasena: string, tieneAuto: boolean): void {
    // Verificar si ya existe un usuario con el mismo nombre
    const usuarioExistente = this.usuarios.find(usuario => usuario.nombre === nombre);

    if (usuarioExistente) {
      // Manejar el caso de usuario duplicado, mostrar un mensaje o tomar alguna acción
      alert('Error: Ya existe un usuario con el mismo nombre.');
      (this.cerrarSesion)
      return;
    }

    // Si no hay un usuario existente, agregar el nuevo usuario
    const nuevoUsuario = { nombre, contrasena, tieneAuto, solicitudes: [] };
    this.usuarios.push(nuevoUsuario);

    // Guardar usuarios en el localStorage
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.usuarios));
  }

  iniciarSesion(nombre: string, contrasena: string): boolean {
    const usuarioEncontrado = this.usuarios.find(
      (usuario) => usuario.nombre === nombre && usuario.contrasena === contrasena
    );

    if (usuarioEncontrado) {
      this.usuarioActual = usuarioEncontrado;
      return true;
    }

    return false;
  }

  cerrarSesion(): void {
    this.usuarioActual = undefined;
    localStorage.removeItem('usuarioActual');
  }

  obtenerUsuarioActual(): { nombre: string; contrasena: string; tieneAuto: boolean; solicitudes: string[] } | undefined {
    return this.usuarioActual;
  }

  obtenerUsuarios(): { nombre: string; contrasena: string; tieneAuto: boolean; solicitudes: string[] }[] {
    return [...this.usuarios];
  }
  obtenerConductores(): { nombre: string; contrasena: string; tieneAuto: boolean }[] {
    if (this.usuarioActual) {
      const nombresSolicitudes = this.usuarioActual.solicitudes || [];
      return this.usuarios.filter(usuario =>
        usuario.tieneAuto && !nombresSolicitudes.includes(usuario.nombre)
      );
    } else {
      return [];
    }
  }
  
  obtenerPasajeros(): { nombre: string; contrasena: string; tieneAuto: boolean }[] {
    if (this.usuarioActual) {
      return this.usuarios.filter(usuario =>
        !usuario.tieneAuto && !usuario.solicitudes.includes(this.usuarioActual?.nombre || '')
      );
    } else {
      return [];
    }
  }
  

  obtenerSolicitudesViaje(): { pasajero: string; conductor: string }[] {
    const solicitudes: { pasajero: string; conductor: string }[] = [];

    this.usuarios.forEach(conductor => {
      conductor.solicitudes.forEach(pasajero => {
        solicitudes.push({ pasajero, conductor: conductor.nombre });
      });
    });

    return solicitudes;
  }

  enviarSolicitudViaje(pasajero: string, conductor: string): void {
    const conductorEncontrado = this.usuarios.find(usuario => usuario.nombre === conductor);

    if (conductorEncontrado) {
      conductorEncontrado.solicitudes.push(pasajero);
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.usuarios));
    } else {
      // Cambio aquí: Mostrar un mensaje de alerta si el conductor no se encuentra
      alert(`Error: No se encontró al conductor ${conductor}`);
    }
  }

    estaAutenticado(): boolean {
    return !!this.obtenerUsuarioActual();
  }


  actualizarUsuarios(): void {
    // Realizar las actualizaciones necesarias
    // ...
  }
}
