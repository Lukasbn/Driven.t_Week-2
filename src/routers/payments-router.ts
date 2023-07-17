import { getPayment, postPayment } from "@/controllers/payments-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { paymentSchema } from "@/schemas/payment-schemas";
import { Router } from "express";

const paymentRouter = Router()

paymentRouter.get('/', authenticateToken ,getPayment)
paymentRouter.post('/process', authenticateToken, validateBody(paymentSchema), postPayment)
export {paymentRouter}