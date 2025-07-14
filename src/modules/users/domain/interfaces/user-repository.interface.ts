import { IBaseRepository } from "@/common/base/interfaces/base-repository.interface"
import { User } from "@/modules/users/domain/entities/users.entity"

export const USER_REPOSITORY = Symbol("USER_REPOSITORY")

export interface IUserRepository extends IBaseRepository<User> {
    isEmailTaken(email: string): Promise<boolean>
    isCpfCnpjTaken(cpfCnpj: string): Promise<boolean>
}