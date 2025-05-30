export interface EnvConfig {
    getJwtSecret(): string
    getJwtExpiresInSeconds(): number
}