import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { ILeaveServerByIdUseCase } from "../../../shared/interfaces/modules/member/useCases/ILeaveServerByIdUseCase";
import LeaveServerByIdUseCase from "../useCases/leave-server-by-id-useCase";

export default class LeaveServerByIdController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            // Lógica do Controller
            const instanceOfLeaveServerByIdUseCase = container.resolve<ILeaveServerByIdUseCase>(LeaveServerByIdUseCase)

            return res.status(200).json();
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
