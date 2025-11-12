import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client
} from "@aws-sdk/client-s3"
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException
} from "@nestjs/common"
import { extname } from "path"
import { v4 as uuid } from "uuid"

export type UploadType = "product" | "logo"

@Injectable()
export class S3UploadService {
    private s3: S3Client
    private readonly bucket: string

    constructor() {
        this.s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
            }
        })

        this.bucket = process.env.AWS_S3_BUCKET!
    }

    async uploadFile(
        file: Express.Multer.File,
        establishmentId: string,
        type: UploadType
    ): Promise<string> {
        if (!file) throw new BadRequestException("Nenhum arquivo enviado")

        const fileExtension = extname(file.originalname)
        const fileKey = this.generateFileKey(
            establishmentId,
            type,
            fileExtension
        )

        try {
            const command = new PutObjectCommand({
                Bucket: this.bucket,
                Key: fileKey,
                Body: file.buffer,
                ContentType: file.mimetype
            })

            const result = await this.s3.send(command)

            if (!result)
                throw new InternalServerErrorException(
                    "Falha ao salvar imagem no S3"
                )

            return this.generatePublicUrl(fileKey)
        } catch (error) {
            console.error("❌ Erro ao enviar arquivo pro S3:", error)
            throw new InternalServerErrorException(
                `Erro ao salvar imagem: ${error.message ?? "Falha desconhecida"}`
            )
        }
    }

    async deleteFile(fileKey: string): Promise<void> {
        try {
            const command = new DeleteObjectCommand({
                Bucket: this.bucket,
                Key: fileKey
            })

            await this.s3.send(command)
        } catch (error) {
            console.error("❌ Erro ao deletar arquivo do S3:", error)
            throw new InternalServerErrorException(
                `Erro ao deletar imagem: ${error.message ?? "Falha desconhecida"}`
            )
        }
    }

    private generateFileKey(
        establishmentId: string,
        type: UploadType,
        extension: string
    ): string {
        if (type === "logo") return `logos/${establishmentId}/logo${extension}`

        return `products/${establishmentId}/${uuid()}${extension}`
    }

    private generatePublicUrl(fileKey: string): string {
        return `https://${this.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`
    }
}
