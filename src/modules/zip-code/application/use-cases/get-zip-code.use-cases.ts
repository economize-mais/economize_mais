import { AxiosProvider } from "@/common/providers/axios.provider"
import { 
    BadRequestException, 
    Injectable, 
    NotFoundException 
} from "@nestjs/common"

import { ViaCepDto } from "../dto/via-cep.dto"
import { ZipCodePresenter } from "../presenter/zip-code.presenter"

@Injectable()
export class GetZipCodeUseCase {

    constructor(
        private readonly provider: AxiosProvider
    ) {}

    async execute(cep: string) {

        if(!/^\d{5}-\d{3}$/.test(cep)) throw new BadRequestException("O campo cep deve estar no formato xxxxx-xxx")
            
        const api = this.provider.createApi("https://viacep.com.br/")

        return await api.get(`ws/${cep.replace("-", "")}/json/`)
            .then(res => { 
                if(res.data.erro) throw new NotFoundException(`CEP ${cep} não encontrado`)
                return ZipCodePresenter.from(res.data as ViaCepDto)
            })
            .catch(err => {
                throw new BadRequestException(err.message)
            })
    }
}