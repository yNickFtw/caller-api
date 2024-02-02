import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IAuthenticateUserUseCase } from "../../../shared/interfaces/modules/user/useCases/IAuthenticateUserUseCase";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IJWTResponse } from "../../../shared/interfaces/modules/user/useCases/IJWTResponse";
import { IBCryptService } from "../../../shared/services/BCryptService/IBCryptService";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IUser } from "../../../shared/interfaces/modules/user/IUser";

@injectable()
export default class AuthenticateUserUseCase implements IAuthenticateUserUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("BCryptService")
        private BCryptService: IBCryptService,
        @inject("JWTService")
        private JWTService: IJWTService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(email: string, password: string): Promise<IJWTResponse> {
        if (!email || !password) {
            const error: IAppError = {
                statusCode: 400,
                message: "Preencha todos os campos."
            };

            throw error;
        }

        const user = await this.UserRepository.findByEmail(email)

        if (!user) {
            const error: IAppError = {
                statusCode: 404,
                message: "Verifique se os dados estão corretos."
            };

            throw error;
        }

        const passwordMatch = await this.BCryptService.comparePassword(password, user.password);

        if (!passwordMatch) {
            const error: IAppError = {
                statusCode: 400,
                message: "Verifique se os dados estão corretos."
            };

            throw error;
        }

        const payload = {
            userId: user.id
        }

        const token = this.JWTService.generateToken(payload, '30d');

        return { userId: user.id, token: token, user: { id: user.id, email: user.email, picture: user.picture, pictureFilename: user.pictureFilename } as IUser } as IJWTResponse;
    }
}