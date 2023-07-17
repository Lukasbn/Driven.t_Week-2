import { getTicket, getTypes, postTicket } from "@/controllers/tickets-controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketRouter = Router()

ticketRouter.get('/types', authenticateToken, getTypes)
ticketRouter.get('/', authenticateToken, getTicket)
ticketRouter.post('/', authenticateToken, postTicket)

export {ticketRouter}