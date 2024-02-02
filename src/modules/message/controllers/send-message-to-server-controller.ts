import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { ISendMessageToServerUseCase } from "../../../shared/interfaces/modules/message/useCases/ISendMessageToServerUseCase";
import SendMessageToServerUseCase from "../useCases/send-message-to-server-useCase";

export default class SendMessageToServerController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { text } = req.body;

            const { channelId } = req.params;

            const file: Express.Multer.File | undefined = req.file;

            const instanceOfSendMessageToServerUseCase = container.resolve<ISendMessageToServerUseCase>(SendMessageToServerUseCase)

            await instanceOfSendMessageToServerUseCase.execute(token, text, file, channelId)

            return res.status(201).json({ message: "Mensagem enviada com sucesso." });
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
