import { prisma } from "@/config"
import { Payment } from "@/protocols"

async function getPaymentDB(ticketId: number){
    return await prisma.payment.findFirst({
        where:{
            ticketId
        }
    })

}

async function postPaymentDB(body: Payment, price:number){
    return await prisma.payment.create({
        data:{
            ticketId: body.ticketId,
            value: price,
            cardIssuer: body.cardData.issuer,
            cardLastDigits: body.cardData.number.toString().slice(-4)
        }
    })
}

const paymentDB = {
    getPaymentDB,
    postPaymentDB
}

export default paymentDB