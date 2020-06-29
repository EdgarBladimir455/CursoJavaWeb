import { TipoPerfil } from './tipo-perfil';
import { Estatus } from './estatus';
import { Alumno } from './alumno';
import { Maestro } from './maestro';

export class Usuario {
  idUsuario: number;
  nombre: string;
  estatus: Estatus;
  usuario: string;
  contrasena: string;
  tipoPerfil: TipoPerfil;
  alumno: Alumno;
  maestro: Maestro;
}
