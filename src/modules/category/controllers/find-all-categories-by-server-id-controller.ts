import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFindAllCategoriesByServerIdUseCase } from "../../../shared/interfaces/modules/category/useCases/IFindAllCategoriesByServerIdUseCase";
import FindAllCategoriesByServerIdUseCase from "../useCases/find-all-categories-by-server-id-useCase";

export default class FindAllCategoriesByServerIdController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { serverId } = req.params;

            const instanceOfFindAllCategoriesByServerIdUseCase = container.resolve<IFindAllCategoriesByServerIdUseCase>(FindAllCategoriesByServerIdUseCase)

            const categories = await instanceOfFindAllCategoriesByServerIdUseCase.execute(token, serverId);

            return res.status(200).json(categories);
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
