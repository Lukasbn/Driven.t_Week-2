import { notFoundError } from "@/errors"
import enrollmentRepository from "@/repositories/enrollment-repository"
import ticketsDB from "@/repositories/tickests-repository"

async function getTypes(){
    return await ticketsDB.getTypesDB()
}

async function getTickect(id:number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(id)
    if(!enrollment){
        throw notFoundError()
    }
    const EID = enrollment.id
    const result =  await ticketsDB.getTicketDB(EID)
    if(!result){
        throw notFoundError()
    }
    return result
}
async function getTickectByTicketId(id:number){
    const ticket = await ticketsDB.getTickectByTicketIdDB(id)

    if(!ticket){
        throw notFoundError()
    }
    return ticket
}
async function postTicket(TID:number,id:number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(id)
    if(!enrollment){
        throw notFoundError()
    }
    const EID = enrollment.id
    return await ticketsDB.postTicketDB(TID,EID)
}

const ticketsService = {
    getTypes,
    getTickect,
    postTicket,
    getTickectByTicketId
}

export default ticketsService