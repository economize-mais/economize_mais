import { Inject, Injectable } from "@nestjs/common"

import { originToResponse } from "../presenter/origins.presenter"

import {
    IOriginRepository,
    ORIGIN_REPOSITORY
} from "../../domain/interfaces/origin-repository.interface"

@Injectable()
export class GetOriginUseCase {
    constructor(
        @Inject(ORIGIN_REPOSITORY)
        private readonly origin: IOriginRepository
    ) {}

    async execute() {
        const results = await this.origin.find()
        return results.map((result) => originToResponse(result))
    }
}
