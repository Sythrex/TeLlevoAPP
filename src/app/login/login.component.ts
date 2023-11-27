// login.component.ts
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../usuario.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  nombreUsuario: string = '';
  contrasenaUsuario: string = '';

  constructor(private usuarioService: UsuarioService, private navCtrl: NavController, private alertController: AlertController) {}

  
  async iniciarSesion() {
    if (this.usuarioService.iniciarSesion(this.nombreUsuario, this.contrasenaUsuario)) {
      // Inicio de sesión exitoso, redirigir a la página principal
      this.navCtrl.navigateForward('/home'); // Cambiado a '/home'
    } else {
      // Mostrar una alerta en caso de inicio de sesión fallido
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Nombre de usuario o contraseña incorrectos. Verifica tus credenciales.',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    //limpia campos de perra
    this.nombreUsuario = '';
    this.contrasenaUsuario = '';


    
  }
  async registrarse(){
    this.nombreUsuario = '';
    this.contrasenaUsuario = '';
    this.navCtrl.navigateForward('/registro');
  }
  
}