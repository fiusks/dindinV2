import { number, object, SchemaOf, string, ValidationError } from 'yup';
import { IUserData } from '../models/users';
import { RequestHandler } from 'express';

const userSignUpSchema: SchemaOf<IUserData> = object().shape({
    id:number(),
    firstname: string().required("O nome é obrigatório"),
    lastname: string().required('O sobrenome é obrigatório'),
    email: string().email('Inserir um e-mail válido').required('O e-mail é obrigatório'),
    password: string().required()

})

export const validateSignUp: RequestHandler = async (req, res, next) => {
    try {
        await userSignUpSchema.validate(req.body, {
            abortEarly: false
        })
        next()

    } catch (error: any) {
      /*erro nunca chega no front por conta da validação do front. O front não
      está desestruturando para receber o erro corretamente*/

        const newError = new ValidationError(error)
        const errorList: Record<string, string> = {};

        newError.inner.forEach((errorField) => {
            errorList[errorField.path!] = errorField.message;
        });

        if (errorList) {
            const errorMsg = { message: errorList };
            return res.status(400).json(errorMsg);
        }
        return res.status(404).json(newError);

    }
}
