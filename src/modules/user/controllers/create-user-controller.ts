import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { ICreateUserUseCase } from "../../../shared/interfaces/modules/user/useCases/ICreateUserUseCase";
import CreateUserUseCase from "../useCases/create-user-useCase";

export default class CreateUserController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const { username, email, password, confirmPassword } = req.body;

            const instanceOfCreateUserUseCase = container.resolve<ICreateUserUseCase>(CreateUserUseCase)

            const auth = await instanceOfCreateUserUseCase.execute(username, email, password, confirmPassword);

            return res.status(201).json({ message: "Usuário criado com sucesso.", auth });
        } catch (error: any) {
            if (error.statusCode && error.message) {
                return res.status(error.statusCode).json({ message: error.message });
            } else {
                return res
                    .status(500)
                    .json({
                        message:
                            "Estamos passando por instabilidades, por favor tente novamente mais tarde.",
                        errorMessage: error.message
                    });
            }
        }
    }
}
