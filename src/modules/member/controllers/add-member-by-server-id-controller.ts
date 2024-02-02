import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IAddMemberByServerIdUseCase } from "../../../shared/interfaces/modules/member/useCases/IAddMemberByServerIdUseCase";
import AddMemberByServerIdUseCase from "../useCases/add-member-by-server-id-useCase";

export default class AddMemberByServerIdController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { serverId } = req.body;

            const instanceOfAddMemberByServerIdUseCase = container.resolve<IAddMemberByServerIdUseCase>(AddMemberByServerIdUseCase)

            const serverAdded = await instanceOfAddMemberByServerIdUseCase.execute(token, serverId);

            return res.status(201).json(serverAdded);
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
