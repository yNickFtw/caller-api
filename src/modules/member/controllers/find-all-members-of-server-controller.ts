import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFindAllMembersOfServerUseCase } from "../../../shared/interfaces/modules/member/useCases/IFindAllMembersOfServerUseCase";
import FindAllMembersOfServerUseCase from "../useCases/find-all-members-of-server-useCase";

export default class FindAllMembersOfServerController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { serverId } = req.params

            const instanceOfFindAllMembersOfServerUseCase = container.resolve<IFindAllMembersOfServerUseCase>(FindAllMembersOfServerUseCase)

            const members = await instanceOfFindAllMembersOfServerUseCase.execute(token, serverId);

            return res.status(200).json(members);
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
