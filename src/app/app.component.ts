// app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    // Verificar si hay una sesión activa al iniciar la aplicación
    const usuarioActual = this.usuarioService.obtenerUsuarioActual();

    if (!usuarioActual) {
      // No hay sesión activa, navegar a la página de inicio de sesión
      this.router.navigate(['/login']);
    }
  }
}
