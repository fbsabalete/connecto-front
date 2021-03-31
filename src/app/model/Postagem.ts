import { Tema } from './Tema';
import { Usuario } from './Usuario';

export class Postagem{

  public id: number
  public titulo: string
  public descricaoPost: string
  public linkImagem: string
  public date: Date
  public prestadorServicos: boolean
  public usuario: Usuario
  public tema: Tema
}
