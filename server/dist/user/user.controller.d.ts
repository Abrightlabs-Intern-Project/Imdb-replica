import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    loginUser(loginData: LoginDto): Promise<{
        userId: string;
        userName: string;
        createdAt: Date;
        favouriteGenreId: string;
    }>;
}
