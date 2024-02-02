import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFindAllIdServersOfUserUseCase } from "../../../shared/interfaces/modules/server/useCases/IFindAllIdServersOfUserUseCase";
import FindAllIdServersOfUserUseCase from "../useCases/find-all-id-servers-of-user-useCase";

export default class FindAllIdServersOfUserController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const instanceOfFindAllIdServersOfUserUseCase = container.resolve<IFindAllIdServersOfUserUseCase>(FindAllIdServersOfUserUseCase)

            const serversIdArray = await instanceOfFindAllIdServersOfUserUseCase.execute(token);

            return res.status(200).json(serversIdArray);
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
