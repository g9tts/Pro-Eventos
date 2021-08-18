import { Evento } from "./Evento";
import { RedeSocial } from "./RedeSocial";

export interface Palestrante {

  Id: number;

  Nome: string;

  Minicurriculo: string;

  ImagemURL: string;

  Telefone: string;

  Email: string;

  RedesSociais: RedeSocial[];

  PalestrantesEventos: Evento[];
}
