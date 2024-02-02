import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFindAllMessagesByChannelIdUseCase } from "../../../shared/interfaces/modules/message/useCases/IFindAllMessagesByChannelIdUseCase";
import FindAllMessagesByChannelIdUseCase from "../useCases/find-all-messages-by-channel-id-useCase";

export default class FindAllMessagesByChannelIdController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { channelId, serverId } = req.params
            const instanceOfFindAllMessagesByChannelIdUseCase = container.resolve<IFindAllMessagesByChannelIdUseCase>(FindAllMessagesByChannelIdUseCase)

            const messages = await instanceOfFindAllMessagesByChannelIdUseCase.execute(token, channelId, serverId)

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
