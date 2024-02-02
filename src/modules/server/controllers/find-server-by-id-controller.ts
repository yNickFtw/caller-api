import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFindServerByIdUseCase } from "../../../shared/interfaces/modules/server/useCases/IFindServerByIdUseCase";
import FindServerByIdUseCase from "../useCases/find-server-by-id-useCase";

export default class FindServerByIdController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { serverId } = req.params;

            const instanceOfFindServerByIdUseCase = container.resolve<IFindServerByIdUseCase>(FindServerByIdUseCase)

            const server = await instanceOfFindServerByIdUseCase.execute(token, serverId);

            return res.status(200).json(server);
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
