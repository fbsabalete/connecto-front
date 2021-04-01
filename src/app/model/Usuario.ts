import { Postagem } from './Postagem';

export class Usuario{

  public id: number
  public nomeCompleto: string
  public fotoPerfil: string
  public email: string
  public senha: string
  public tipoAdmin: string
  public postagem: Postagem[]

}
