import { 
    DocumentBuilder, 
    SwaggerCustomOptions, 
    SwaggerModule 
} from "@nestjs/swagger"
import { config } from "dotenv"
import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"

import { AppModule } from "./app.module"
import * as packageJSON from "../package.json"

config()

async function bootstrap() {
    
    const app = await NestFactory.create(AppModule)

    app.enableCors()

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }))

    const config = new DocumentBuilder()
        .setTitle("Apis Economize Mais")
        .setDescription(packageJSON.description)
        .setContact(packageJSON.author, "", "economize.mais.app@gmail.com")
        .setVersion(packageJSON.version)
        // .addBearerAuth()
        .setVersion(packageJSON.version)
        .build()

    const options: SwaggerCustomOptions = {
        customSiteTitle: "Apis Economize Mais"
    }

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup("api-docs", app, document, options)

    await app.listen(process.env.PORT || 3000)
}

bootstrap()