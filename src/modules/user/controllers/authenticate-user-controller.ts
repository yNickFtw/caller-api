import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IAuthenticateUserUseCase } from "../../../shared/interfaces/modules/user/useCases/IAuthenticateUserUseCase";
import AuthenticateUserUseCase from "../useCases/authenticate-user-useCase";

export default class AuthenticateUserController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            // Lógica do Controller
            const { email, password } = req.body

            const instanceOfAuthenticateUserUseCase = container.resolve<IAuthenticateUserUseCase>(AuthenticateUserUseCase)

            const auth = await instanceOfAuthenticateUserUseCase.execute(email, password);

            return res.status(200).json({ message: "Autenticado com sucesso.", auth });
        } catch (error: any) {
            if (error.statusCode && error.message) {
                return res.status(error.statusCode).json({ message: error.message });
            } else {
                return res
                    .status(500)
                    .json({
                        message:
                            "Estamos passando por instabilidades, tente novamente mais tarde!",
                        errorMessage: error.message
                    });
            }
        }
    }
}
