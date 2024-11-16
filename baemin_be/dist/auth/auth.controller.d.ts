import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginUserDto): Promise<{
        access_token: string;
        user_id: any;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
    getUserId(req: any): Promise<any>;
}
