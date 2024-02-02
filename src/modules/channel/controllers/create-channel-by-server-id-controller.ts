import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { ICreateChannelByServerIdUseCase } from "../../../shared/interfaces/modules/channel/useCases/ICreateChannelByServerIdUseCase";
import CreateChannelByServerIdUseCase from "../useCases/create-channel-by-server-id-useCase";

export default class CreateChannelByServerIdController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { name } = req.body;

            const { serverId, categoryId } = req.params;

            const instanceOfCreateChannelByServerIdUseCase = container.resolve<ICreateChannelByServerIdUseCase>(CreateChannelByServerIdUseCase)

            const channel = await instanceOfCreateChannelByServerIdUseCase.execute(token, name, categoryId, serverId)

            return res.status(201).json({ message: "Canal criado com sucesso", channel });
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
