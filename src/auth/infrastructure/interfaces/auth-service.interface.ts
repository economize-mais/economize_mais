import { JwtPayload } from "./jwt-payload.interface"

export const AUTH_SERVICE = Symbol("AUTH_SERVICE")

export interface IAuthService {
    generateJwt(payload: JwtPayload): Promise<string>
    verifyJwt(token: string): Promise<JwtPayload>
}