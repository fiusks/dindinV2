import { Router } from "express";
import { listAllTransactions } from "../controllers/transactions";
import { signIn, signUp } from "../controllers/users";
import { validateSignUp } from "../middlewares/validateSignUp";
import { validateToken } from "../middlewares/validateToken";

const routes = Router()


routes.post("/api/auth/signup",validateSignUp,signUp)
routes.post("/api/auth/signin",signIn)

routes.use(validateToken)
routes.get('/transactions', listAllTransactions);
// routes.post('/transactions', createTransaction);
// routes.delete('/transactions/:id', deleteTransaction);
// routes.put('/transactions/:id', updateTransaction);
// routes.post('/filtertransactions',listFilteredTransactions)



export default routes
