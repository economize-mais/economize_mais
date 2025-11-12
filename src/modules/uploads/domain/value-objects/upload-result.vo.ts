export class UploadResultVo {
    url: string
    originalName: string
    mimeType: string
    size: number

    constructor(partial: Partial<UploadResultVo>) {
        Object.assign(this, partial)
    }
}
