import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    Inject
} from "@nestjs/common"

import { 
    AUTH_SERVICE, 
    IAuthService 
} from "./interfaces/auth-service.interface"

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        @Inject(AUTH_SERVICE)
        private authService: IAuthService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if(!token)
            throw new UnauthorizedException()

        try {
            request["user"] = await this.authService.verifyJwt(token)
        } catch {
            throw new UnauthorizedException()
        }

        return true
    }

    private extractTokenFromHeader(request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? []
        return type === "Bearer" ? token : undefined
    }
}
