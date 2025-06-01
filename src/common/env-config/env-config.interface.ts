export interface IEnvConfig {
    getJwtSecret(): string
    getJwtExpiresInSeconds(): number
}