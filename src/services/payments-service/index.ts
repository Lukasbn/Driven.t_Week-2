import { notFoundError, notYourTicketError } from "@/errors"
import enrollmentRepository from "@/repositories/enrollment-repository"
import paymentDB from "@/repositories/payments-repository"
import ticketsDB from "@/repositories/tickests-repository"
import ticketsService from "../tickets-service"
import { Payment } from "@/protocols"

async function getPayment(Userid:number, ticketId:number){
    const ticket = await ticketsService.getTickectByTicketId(ticketId)
    const enrollment = await enrollmentRepository.findWithAddressByUserId(Userid)
    if(!enrollment.id){
        throw notFoundError()
    }
    const EID = enrollment.id
    if(ticket.enrollmentId !== EID){
        throw notYourTicketError()
    }
    const result = await paymentDB.getPaymentDB(ticketId)
    if(!result){
        throw notFoundError()
    }

    return result
}

async function postPayment(body: Payment, id:number){
    const ticket = await ticketsService.getTickectByTicketId(body.ticketId)
    const enrollment = await enrollmentRepository.findWithAddressByUserId(id)

    const EID = enrollment.id
    if(ticket.enrollmentId !== EID){
        throw notYourTicketError
    }

    const type = await ticketsDB.getTypeByTypeIdDB(ticket.ticketTypeId)
    await paymentDB.postPaymentDB(body,type.price)
    await ticketsDB.payTicketByIdDB(body.ticketId)

    const result = paymentDB.getPaymentDB(body.ticketId)
    return result
}

const paymentservice = {
    getPayment,
    postPayment
}

export default paymentservice