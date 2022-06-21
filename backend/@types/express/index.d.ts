import { IUserDB } from "../../src/models/users";

declare global{
    namespace Express {
        interface Request {
            user?: Pick<IUserDB,'id'>
        }
    }
}
