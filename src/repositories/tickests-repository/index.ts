import { prisma } from "@/config";

async function getTypesDB(){
    const result = await prisma.ticketType.findMany()
    return result
}

async function getTypeByTypeIdDB(id:number){
    return await prisma.ticketType.findUnique({
        where:{
            id
        }
    })
}

async function getTicketDB(enrollmentId:number){
    const result = await prisma.ticket.findFirst({
        include:{
            TicketType: true
        },
        where:{enrollmentId}
    })

    return result
}

async function postTicketDB(ticketTypeId: number, enrollmentId: number){
    const result = await prisma.ticket.create({
        data:{
            ticketTypeId,
            enrollmentId,
            status: "RESERVED"
        }
    })
}

async function getTickectByTicketIdDB(id:number){
    return await prisma.ticket.findUnique({
        where:{id}
    })
}

async function payTicketByIdDB(id:number){
    return await prisma.ticket.update({
        data:{
            status: "PAID"
        },
        where:{
            id
        }
    })
}

const ticketsDB = {
    getTypesDB,
    getTicketDB,
    postTicketDB,
    getTickectByTicketIdDB,
    getTypeByTypeIdDB,
    payTicketByIdDB
}

export default ticketsDB