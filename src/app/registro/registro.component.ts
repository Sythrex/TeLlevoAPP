// registro.component.ts
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  nombreUsuario: string = '';
  contrasenaUsuario: string = '';
  tieneAuto: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService, private navCtrl: NavController) {}

  async registrarUsuario() {
    if (this.nombreUsuario.trim() !== '' && this.contrasenaUsuario.trim() !== '') {
      // Registrar el usuario
      await this.usuarioService.registrarUsuario(
        this.nombreUsuario,
        this.contrasenaUsuario,
        this.tieneAuto
      );
      
      // Iniciar sesión
      await this.usuarioService.iniciarSesion(this.nombreUsuario, this.contrasenaUsuario);
      
      // Limpiar campos
      this.nombreUsuario = '';
      this.contrasenaUsuario = '';
      this.tieneAuto = false;
      
      // Redireccionar al home
      
      this.navCtrl.navigateForward('/home');
  }
}
  async limpiar(){
    this.nombreUsuario = '';
    this.contrasenaUsuario = '';
    this.navCtrl.navigateForward('/home');
  }

  cerrarSesion(): void {
    this.usuarioService.cerrarSesion();
    this.router.navigate(['/home']); // O la ruta de tu página de inicio de sesión
  }
}