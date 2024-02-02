import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ICreateUserUseCase } from "../../../shared/interfaces/modules/user/useCases/ICreateUserUseCase";
import { IUserRepository } from '../../../shared/interfaces/modules/user/repository/IUserRepository';
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IBCryptService } from "../../../shared/services/BCryptService/IBCryptService";
import { IUser } from "../../../shared/interfaces/modules/user/IUser";
import { IJWTResponse } from "../../../shared/interfaces/modules/user/useCases/IJWTResponse";

@injectable()
export default class CreateUserUseCase implements ICreateUserUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("BCryptService")
        private BCryptService: IBCryptService,
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(username: string, email: string, password: string, confirmPassword: string): Promise<IJWTResponse> {
        if (!username || !email || !password || !confirmPassword) {
            const error: IAppError = {
                statusCode: 400,
                message: "Preencha todos os campos."
            };

            throw error;
        };

        if (password !== confirmPassword) {
            const error: IAppError = {
                statusCode: 400,
                message: "As senhas devem ser iguais."
            };

            throw error;
        }

        const userExists = await this.UserRepository.findByEmail(email);

        if (userExists) {
            const error: IAppError = {
                statusCode: 400,
                message: "Já existe um usuário com este e-mail."
            };

            throw error;
        };

        const passwordHash = await this.BCryptService.encryptPassword(password);

        const user: Partial<IUser> = {
            username: username,
            email: email,
            password: passwordHash,
        }

        const userCreated = await this.UserRepository.create(user);

        const token = this.JWTService.generateToken({ userId: userCreated.id }, '7d')

        return { token, userId: userCreated.id, user: userCreated };
    }
}
