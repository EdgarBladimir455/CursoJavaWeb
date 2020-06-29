import { Usuario } from './usuario';
import { TipoMaestro } from './tipo-maestro';

export class Maestro extends Usuario {
  idMaestro: number;
  numeroEmpleado: number;
  tipoMaestro: TipoMaestro;
}
