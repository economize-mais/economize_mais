import { IBaseRepository } from "@/common/base/interfaces/base-repository.interface"
import { User } from "@/database/models/users.entity"

export const IUserRepository = "IUserRepository"

export interface IUserRepository extends IBaseRepository<User> {
    emailExists(email: string): Promise<void>
}