import { Portfolio } from './Portfolio';
import { ComentarioPostagem } from './ComentarioPostagem';
import { Postagem } from './Postagem';

export class Usuario{

  public id: number
  public nomeCompleto: string
  public fotoPerfil: string
  public email: string
  public senha: string
  public tipoAdmin: string
  public telefone: string
  public sobreMim: string
  public postagem: Postagem[]
  public portfolio: Portfolio[]
  public comentario: ComentarioPostagem[]

}
