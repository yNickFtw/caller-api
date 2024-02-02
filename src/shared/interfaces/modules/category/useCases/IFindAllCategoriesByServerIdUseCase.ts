import { ICategory } from "../ICategory";

export interface IFindAllCategoriesByServerIdUseCase {
    execute(token: string, serverId: string): Promise<ICategory[] | []>;
}
