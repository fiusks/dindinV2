import { IUserData } from "../../src/models/users";

declare global{
    namespace Express {
        interface Request {
            user?: Pick<IUserData,'id'>
        }
    }
}
