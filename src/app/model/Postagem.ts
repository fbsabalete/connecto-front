import { ComentarioPostagem } from './ComentarioPostagem';
import { Tema } from './Tema';
import { Usuario } from './Usuario';

export class Postagem{

  public id: number
  public descricaoPost: string
  public linkImagem: string
  public date: Date
  public prestadorServicos: boolean
  public tema: Tema
  public usuario: Usuario
  public comentario: ComentarioPostagem[]
}
