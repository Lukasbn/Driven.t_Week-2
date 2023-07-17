import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export  async function getTypes(req: AuthenticatedRequest , res:Response){
    const banco = await ticketsService.getTypes()
    res.send(banco)
}

export async function getTicket(req: AuthenticatedRequest, res: Response){
    const id = req.userId
    const banco  = await ticketsService.getTickect(id)
    res.send(banco)
}

export async function postTicket(req: AuthenticatedRequest, res:Response){
    const id = req.userId
    const {ticketTypeId} = req.body
    if(isNaN(ticketTypeId)){
        return res.status(httpStatus.BAD_REQUEST).send("TicketTypeId must be a number")
    }
    await ticketsService.postTicket(ticketTypeId,id)
    const ticket = await ticketsService.getTickect(id)

    res.status(httpStatus.CREATED).send(ticket)
}
