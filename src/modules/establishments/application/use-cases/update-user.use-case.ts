// import { Inject, Injectable, NotFoundException } from "@nestjs/common"

// import {
//     IUserRepository,
//     USER_REPOSITORY
// } from "../../domain/interfaces/user-repository.interface"
// import { UserValidator } from "../../domain/validators/user.validator"

// import { UpdateUserDto } from "../dto/update-user.dto"
// import { userToResponse } from "../presenter/user.presenter"

// @Injectable()
// export class UpdateUserUseCase {
//     constructor(
//         @Inject(USER_REPOSITORY)
//         private readonly repo: IUserRepository
//     ) {}

//     async execute(id: string, data: UpdateUserDto) {
//         new UserValidator().validate(data)

//         if (!(await this.repo.findOne({ where: { id } })))
//             throw new NotFoundException(`id ${id} não encontrado`)

//         data.id = id

//         return userToResponse(await this.repo.save(data), {
//             usage: true,
//             privacy: true
//         })
//     }
// }
