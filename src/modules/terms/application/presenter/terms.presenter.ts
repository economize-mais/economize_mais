import { Terms } from "../../domain/entities/terms.entity"
import { TermsResponseDto } from "../dto/terms-response.dto"

export const termToResponse = (document: Terms): TermsResponseDto => {
    return {
        id: document.id,
        title: document.type === "USAGE" ? "Termos de uso" : "Politica de privacidade",
        html: document.contentHtml
    } as TermsResponseDto
}
