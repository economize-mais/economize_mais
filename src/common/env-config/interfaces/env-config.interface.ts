export const ENV_CONFIG = Symbol("ENV_CONFIG")

export interface IEnvConfig {
    getJwtSecret(): string
    getJwtExpiresInSeconds(): number
}