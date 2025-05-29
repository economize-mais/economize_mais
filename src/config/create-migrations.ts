import { execSync } from "node:child_process"

const name = process.argv[2]

if (!name) {
    console.error("❌ Você precisa passar o nome da migration. Ex: npm run migration:create CreateUserTable")
    process.exit(1)
}

const command = `npx typeorm migration:create src/infra/database/migrations/${name}`
console.log(`▶️ Executando: ${command}`)
execSync(command, { stdio: "inherit" })