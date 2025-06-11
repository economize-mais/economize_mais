import { 
    Inject, 
    Injectable, 
    NotFoundException 
} from "@nestjs/common"

import { 
    ITermsRepository, 
    TERMS_REPOSITORY 
} from "../../domain/interfaces/terms-repository.interface"

import { termToResponse } from "../presenter/terms.presenter"

@Injectable()
export class GetTermsByTypeUseCase {
    
    constructor(
        @Inject(TERMS_REPOSITORY)
        private readonly terms: ITermsRepository
    ){}

    async execute(type: "USAGE" | "PRIVACY") {

        const document = await this.terms.findByType(type)
        
        if(!document)
            throw new NotFoundException(`Documento ${type} não encontrado`)

        return termToResponse(document)
    }
}