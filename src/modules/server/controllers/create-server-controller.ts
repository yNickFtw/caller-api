import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container, instanceCachingFactory } from "tsyringe";
import { ICreateServerUseCase } from "../../../shared/interfaces/modules/server/useCases/ICreateServerUseCase";
import CreateServerUseCase from "../useCases/create-server-useCase";

export default class CreateServerController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { name } = req.body;
            
            const file: Express.Multer.File | undefined = req.file;

            const instanceOfCreateServerUseCase = container.resolve<ICreateServerUseCase>(CreateServerUseCase)

            const server = await instanceOfCreateServerUseCase.execute(token, file ,name);

            return res.status(201).json({ message: "Servidor criado com sucesso.", server });
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
