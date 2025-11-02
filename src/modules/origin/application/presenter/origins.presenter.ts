import { OriginResponseDto } from "../dto/origin-response.dto"

import { Origin } from "../../domain/entities/origin.entity"

export const originToResponse = (result: Origin): OriginResponseDto => {
    return {
        id: result.id,
        description: result.description
    } as OriginResponseDto
}
