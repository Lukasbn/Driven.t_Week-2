import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentservice from '@/services/payments-service';

export async function getPayment(req: AuthenticatedRequest, res:Response){
    const id = req.userId
    const {ticketId} = req.query
    const TID = Number(ticketId)
    if(isNaN(TID)){
        return res.status(httpStatus.BAD_REQUEST).send('ticketId must be a valid number')
    }

    const banco = await paymentservice.getPayment(id,TID)
    res.send(banco)
}

export async function postPayment(req: AuthenticatedRequest, res: Response){
    const data = req.body
    const id = req.userId
    const banco = await paymentservice.postPayment(data,id)
    res.send(banco)
}