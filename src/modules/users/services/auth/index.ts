import { userRepo } from '../../repos';
import { AuthService, IAuthService } from './authService';

const authService: IAuthService = new AuthService(userRepo);

export { authService };
