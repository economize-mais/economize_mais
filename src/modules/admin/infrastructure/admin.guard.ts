import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from "@nestjs/common"

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const key = request.headers["x-admin-key"]

        if (!key || key !== process.env.ADMIN_API_KEY) {
            throw new UnauthorizedException("Chave de admin inválida")
        }

        return true
    }
}
