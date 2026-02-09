#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Pega o nome do módulo do argumento
const moduleName = process.argv[2];

if (!moduleName) {
    console.error('\x1b[31m❌ Erro: Nome do módulo é obrigatório!\x1b[0m');
    console.log('\n\x1b[33mUso: pnpm generate <nome-do-modulo>\x1b[0m');
    console.log('\x1b[33mExemplo: pnpm generate product\x1b[0m\n');
    process.exit(1);
}

// Helpers para formatação de nome
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const lower = (str) => str.toLowerCase();

const name = lower(moduleName);
const Name = capitalize(moduleName);

// Caminhos
const modulePath = path.join(__dirname, '..', 'src', 'modules', name);
const infraPath = path.join(modulePath, 'infra', 'database', 'mongoose');
const modelsPath = path.join(infraPath, 'models');
const reposPath = path.join(infraPath, 'repositories');

// Templates dos arquivos
const templates = {
    // Domain
    [`${name}.domain.ts`]: `export interface ${Name} {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
`,

    // DTO
    [`${name}.dto.ts`]: `import { z } from "zod";
import { Request } from "express";

export const Create${Name}Dto = z.object({
    // Adicione os campos aqui
});

export type Create${Name}DtoType = z.infer<typeof Create${Name}Dto>;

export const Create${Name}Request = z.object({
    body: Create${Name}Dto
});

export interface Create${Name}RequestType extends Request {
    body: Create${Name}DtoType;
}
`,

    // Repository Interface
    [`${name}.repository.ts`]: `import { ${Name} } from "./${name}.domain";
import { Create${Name}DtoType } from "./${name}.dto";

export interface ${Name}Repository {
    create(data: Create${Name}DtoType): Promise<${Name}>;
    findById(id: string): Promise<${Name} | null>;
    findAll(): Promise<${Name}[]>;
    update(id: string, data: Partial<Create${Name}DtoType>): Promise<${Name} | null>;
    delete(id: string): Promise<void>;
}
`,

    // Service
    [`${name}.service.ts`]: `import createHttpError from "http-errors";
import { ${Name}Repository } from "./${name}.repository";
import { Create${Name}DtoType } from "./${name}.dto";

export class ${Name}Service {
    constructor(
        private readonly ${name}Repository: ${Name}Repository
    ) {}

    create = async (data: Create${Name}DtoType) => {
        const ${name} = await this.${name}Repository.create(data);
        return ${name};
    };

    findById = async (id: string) => {
        const ${name} = await this.${name}Repository.findById(id);
        
        if (!${name}) {
            throw createHttpError.NotFound("${Name} not found");
        }
        
        return ${name};
    };

    findAll = async () => {
        return this.${name}Repository.findAll();
    };

    update = async (id: string, data: Partial<Create${Name}DtoType>) => {
        const ${name} = await this.${name}Repository.update(id, data);
        
        if (!${name}) {
            throw createHttpError.NotFound("${Name} not found");
        }
        
        return ${name};
    };

    delete = async (id: string) => {
        await this.${name}Repository.delete(id);
    };
}
`,

    // Controller
    [`${name}.controller.ts`]: `import { Response } from "express";
import { ${Name}Service } from "./${name}.service";
import { Create${Name}RequestType } from "./${name}.dto";

export class ${Name}Controller {
    constructor(
        private readonly ${name}Service: ${Name}Service
    ) {}

    create = async (req: Create${Name}RequestType, res: Response) => {
        const ${name} = await this.${name}Service.create(req.body);
        return res.status(201).json(${name});
    };

    findById = async (req: any, res: Response) => {
        const ${name} = await this.${name}Service.findById(req.params.id);
        return res.status(200).json(${name});
    };

    findAll = async (req: any, res: Response) => {
        const ${name}s = await this.${name}Service.findAll();
        return res.status(200).json(${name}s);
    };

    update = async (req: any, res: Response) => {
        const ${name} = await this.${name}Service.update(req.params.id, req.body);
        return res.status(200).json(${name});
    };

    delete = async (req: any, res: Response) => {
        await this.${name}Service.delete(req.params.id);
        return res.status(204).send();
    };
}
`,

    // Routes
    [`${name}.routes.ts`]: `import { Router } from "express";
import { Container } from "@/shared/container";
import { ${Name}Controller } from "./${name}.controller";
import { authMiddleware } from "@/shared/middlewares/jwt-handler.middleware";
import { validateRequest } from "@/shared/middlewares/validation-request.middleware";
import { Create${Name}Request } from "./${name}.dto";

export const ${name}Routes = Router();

const ${name}Controller = Container.resolve<${Name}Controller>("${Name}Controller");

${name}Routes.post("/", authMiddleware, validateRequest(Create${Name}Request), ${name}Controller.create);
${name}Routes.get("/", authMiddleware, ${name}Controller.findAll);
${name}Routes.get("/:id", authMiddleware, ${name}Controller.findById);
${name}Routes.put("/:id", authMiddleware, ${name}Controller.update);
${name}Routes.delete("/:id", authMiddleware, ${name}Controller.delete);
`,
};

// Templates Infra
const infraTemplates = {
    // Mongoose Model
    [`models/${name}.model.ts`]: `import { model, Schema } from "mongoose";

const ${name}Schema = new Schema({
    // Adicione os campos aqui
    // exemplo:
    // name: {
    //     type: String,
    //     required: true,
    // },
}, { timestamps: true });

export const ${Name}Model = model("${Name}", ${name}Schema);
`,

    // Mongoose Repository
    [`repositories/mongo.${name}.repository.ts`]: `import { ${Name} } from "@/modules/${name}/${name}.domain";
import { Create${Name}DtoType } from "@/modules/${name}/${name}.dto";
import { ${Name}Repository } from "@/modules/${name}/${name}.repository";
import { ${Name}Model } from "../models/${name}.model";

export class Mongo${Name}Repository implements ${Name}Repository {
    
    async create(data: Create${Name}DtoType): Promise<${Name}> {
        const created = await ${Name}Model.create(data);
        
        return {
            id: created._id.toString(),
            createdAt: created.createdAt,
            updatedAt: created.updatedAt,
        };
    }

    async findById(id: string): Promise<${Name} | null> {
        const found = await ${Name}Model.findById(id);
        
        if (!found) return null;
        
        return {
            id: found._id.toString(),
            createdAt: found.createdAt,
            updatedAt: found.updatedAt,
        };
    }

    async findAll(): Promise<${Name}[]> {
        const all = await ${Name}Model.find();
        
        return all.map((item) => ({
            id: item._id.toString(),
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }));
    }

    async update(id: string, data: Partial<Create${Name}DtoType>): Promise<${Name} | null> {
        const updated = await ${Name}Model.findByIdAndUpdate(id, data, { new: true });
        
        if (!updated) return null;
        
        return {
            id: updated._id.toString(),
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
        };
    }

    async delete(id: string): Promise<void> {
        await ${Name}Model.findByIdAndDelete(id);
    }
}
`,
};

// Cria os diretórios
console.log('\n\x1b[36m📁 Criando estrutura de diretórios...\x1b[0m\n');

fs.mkdirSync(modulePath, { recursive: true });
fs.mkdirSync(modelsPath, { recursive: true });
fs.mkdirSync(reposPath, { recursive: true });

// Cria os arquivos do módulo
console.log('\x1b[32m📄 Criando arquivos do módulo:\x1b[0m');

for (const [filename, content] of Object.entries(templates)) {
    const filePath = path.join(modulePath, filename);
    fs.writeFileSync(filePath, content);
    console.log(`   \x1b[32m✓\x1b[0m ${filename}`);
}

// Cria os arquivos de infra
console.log('\n\x1b[32m🗄️  Criando arquivos de infraestrutura:\x1b[0m');

for (const [filename, content] of Object.entries(infraTemplates)) {
    const filePath = path.join(infraPath, filename);
    fs.writeFileSync(filePath, content);
    console.log(`   \x1b[32m✓\x1b[0m infra/database/mongoose/${filename}`);
}

// Instruções finais
console.log('\n\x1b[33m⚠️  Não esqueça de:\x1b[0m');
console.log(`   1. Registrar as dependências em \x1b[36msrc/shared/container/register.ts\x1b[0m`);
console.log(`   2. Adicionar as rotas em \x1b[36msrc/routes.ts\x1b[0m`);
console.log(`   3. Completar os campos no DTO, Domain e Model`);

console.log('\n\x1b[32m✅ Módulo "\x1b[1m' + name + '\x1b[0m\x1b[32m" criado com sucesso!\x1b[0m\n');

// Mostra o código para registrar no container
console.log('\x1b[36m📋 Código para adicionar no register.ts:\x1b[0m\n');
console.log(`\x1b[90m// Repository
Container.register("Mongo${Name}Repository", () => new Mongo${Name}Repository())

// Service
Container.register("${Name}Service", () => new ${Name}Service(
    Container.resolve("Mongo${Name}Repository")
))

// Controller
Container.register("${Name}Controller", () => new ${Name}Controller(
    Container.resolve("${Name}Service")
))\x1b[0m`);

console.log('\n\x1b[36m📋 Código para adicionar no routes.ts:\x1b[0m\n');
console.log(`\x1b[90mimport { ${name}Routes } from "@/modules/${name}/${name}.routes";

router.use('/${name}', ${name}Routes)\x1b[0m\n`);
