import { Evento } from "./Evento";

export interface Lote {

         Id: number;

         nome: string;

         Preco: number;

         DataInicio?: Date;

         DataFim?: Date;

         Quantidade: number;

         EventoId: number;

         Evento: Evento;
}
