import { ICategory } from "../ICategory";

export interface ICategoryRepository {
    create(category: Partial<ICategory>): Promise<ICategory>;
    findAllByServerId(serverId: string, userId: string): Promise<ICategory[]>;
    findById(categoryId: string): Promise<ICategory | null>;
}