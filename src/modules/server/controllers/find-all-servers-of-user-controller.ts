import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFindAllServersOfUserUseCase } from "../../../shared/interfaces/modules/server/useCases/IFindAllServersOfUserUseCase";
import FindAllServersOfUserUseCase from "../useCases/find-all-servers-of-user-useCase";

export default class FindAllServersOfUserController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const instanceOfFindAllServersOfUserUseCase = container.resolve<IFindAllServersOfUserUseCase>(FindAllServersOfUserUseCase)

            const data = await instanceOfFindAllServersOfUserUseCase.execute(token);

            return res.status(200).json(data);
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
