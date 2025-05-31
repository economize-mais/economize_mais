import { 
    createParamDecorator, 
    ExecutionContext 
} from "@nestjs/common"

import { JwtPayload } from "@/auth/interfaces/jwt-payload.interface"

export const User = createParamDecorator(
    (field: keyof JwtPayload | undefined, ctx: ExecutionContext): any => {
        const request = ctx.switchToHttp().getRequest()
        const user: JwtPayload = request.user

        return field ? user?.[field] : user
    }
)