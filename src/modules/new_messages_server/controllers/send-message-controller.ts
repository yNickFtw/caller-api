import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { ISendMessageUseCase } from "../../../shared/interfaces/modules/new_messages_server/useCases/ISendMessageUseCase";
import SendMessageUseCase from "../useCases/send-message-useCase";

export default class SendMessageController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { channelId, serverId } = req.params;

            const instanceOfSendMessageUseCase = container.resolve<ISendMessageUseCase>(SendMessageUseCase)

            await instanceOfSendMessageUseCase.execute(token, channelId, serverId);

            return res.status(201).json({ message: "Notificado com sucesso" });
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
