// usuario.service.spec.ts
import { UsuarioService } from '../src/app/usuario.service';

describe('UsuarioService', () => {
  let usuarioService: UsuarioService;

  beforeEach(() => {
    usuarioService = new UsuarioService();
  });

  it('debería agregar un nuevo usuario', () => {
    const nuevoUsuario = {
      nombre: 'NuevoUsuario',
      contrasena: 'contrasena',
      tieneAuto: true,
      solicitudes: []
    };

    usuarioService.registrarUsuario(nuevoUsuario.nombre, nuevoUsuario.contrasena, nuevoUsuario.tieneAuto);

    const usuarios = usuarioService.obtenerUsuarios();
    expect(usuarios).toContain(jasmine.objectContaining({ nombre: nuevoUsuario.nombre }));
  });

  it('debería iniciar sesión correctamente', () => {
    const usuarioExistente = {
      nombre: 'UsuarioExistente',
      contrasena: 'contrasena',
      tieneAuto: true,
      solicitudes: []
    };

    usuarioService.registrarUsuario(usuarioExistente.nombre, usuarioExistente.contrasena, usuarioExistente.tieneAuto);

    const sesionIniciada = usuarioService.iniciarSesion(usuarioExistente.nombre, usuarioExistente.contrasena);
    const usuarioActual = usuarioService.obtenerUsuarioActual();

    expect(sesionIniciada).toBe(true);
    expect(usuarioActual).toBeDefined();
    expect(usuarioActual?.nombre).toBe(usuarioExistente.nombre);
  });

  // Puedes agregar más pruebas según sea necesario, pero aquí están las dos solicitadas.
});
