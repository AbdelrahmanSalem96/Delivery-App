import { TicketTypeDtoModel } from "../TicketType/TicketType.Model";

export class TicketModel{
  orderId?:string;
  ticketTypeId!: string;
  ticketDetail?:string;
  createdById!:string;
}
