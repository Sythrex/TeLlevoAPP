// En src/app/models/user.model.ts
export interface User {
    id: string;
    nombre: string;
    contraseña: string;
    tieneAuto: boolean; // Nuevo campo
}
