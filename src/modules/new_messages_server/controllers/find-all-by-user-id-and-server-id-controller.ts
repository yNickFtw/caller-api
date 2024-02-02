import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFindAllByUserIdAndServerIdUseCase } from "../../../shared/interfaces/modules/new_messages_server/useCases/IFindAllByUserIdAndServerIdUseCase";
import FindAllByUserIdAndServerIdUseCase from "../useCases/find-all-by-user-id-and-server-id-useCase";

export default class FindAllByUserIdAndServerIdController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { serverId } = req.params;

            const instanceOfFindAllByUserIdAndServerIdUseCase = container.resolve<IFindAllByUserIdAndServerIdUseCase>(FindAllByUserIdAndServerIdUseCase)

            const messages = await instanceOfFindAllByUserIdAndServerIdUseCase.execute(token, serverId);

            return res.status(200).json(messages);
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
