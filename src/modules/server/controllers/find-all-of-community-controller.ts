import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFindAllOfCommunityUseCase } from "../../../shared/interfaces/modules/server/useCases/IFindAllOfCommunityUseCase";
import FindAllOfCommunityUseCase from "../useCases/find-all-of-community-useCase";

export default class FindAllOfCommunityController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            // Lógica do Controller
            const instanceOfFindAllOfCommunityUseCase = container.resolve<IFindAllOfCommunityUseCase>(FindAllOfCommunityUseCase)

            const data = await instanceOfFindAllOfCommunityUseCase.execute();

            return res.status(200).json(data);
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
