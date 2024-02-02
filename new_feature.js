const fs = require("fs");
const readline = require("readline");
const path = require("path");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        })
    })
}

async function newFeature() {
    const moduleName = await askQuestion('Informe o nome do módulo: ');
    const featureClassName = await askQuestion('Informe o nome da classe de funcionalidade: ');
    const featureClassFileName = await askQuestion('Informe o nome do arquivo da classe de funcionalidade: ');
    const promiseOfExecuteMethod = await askQuestion('Informe qual será o tipo de retorno do método execute: ')
    const hasDependencyInjection = await askQuestion('Informe se irá ter injeção de dependências (s/n): ')
    
    let dependenciesInjections = [];
    
    if (hasDependencyInjection.toLowerCase() === 's') {
        const howManyDependencies = parseInt(await askQuestion('Quantas injeções de dependências você precisa? (exp: 3): '));
        
        for (let i = 0; i < howManyDependencies; i++) {
            const dependencyName = await askQuestion(`Informe o nome da ${i + 1}ª dependência: `);
            const dependencyType = await askQuestion(`Informe o tipo da ${i + 1}ª dependência: `);
            
            dependenciesInjections.push({ name: dependencyName, type: dependencyType });
        }
    }
    
    const parameters = await askQuestion('Informe os parâmetros do método execute (useCase): ')
    const httpMethod = await askQuestion('Informe o HTTP Methodo (ex: post, get, put...): ');
    const endpoint = await askQuestion("E por último, informe o endpoint: (exp: '/find/all'): ")

  if (!moduleName || !featureClassName || !featureClassFileName) {
    console.error("Por favor, informe todas as informações pendentes!");
    process.exit(1);
  }

  const modulePath = path.join(__dirname, "src", "modules", moduleName);
  const controllerPath = path.join(modulePath, "controllers");
  const useCasesPath = path.join(modulePath, "useCases");
  const routerPath = path.join(modulePath, 'router', `${moduleName}.router.ts`);
  const interfacesUseCasePath = path.join(
    __dirname,
    "src",
    "shared",
    "interfaces",
    "modules",
    moduleName,
    "useCases"
  );

  try {
    if (!fs.existsSync(modulePath)) {
      fs.mkdirSync(modulePath);
    }

    // Criação do Controller
    const controllerContent = `import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { I${featureClassName}UseCase } from "../../../shared/interfaces/modules/${moduleName}/useCases/I${featureClassName}UseCase";
import ${featureClassName}UseCase from "../useCases/${featureClassFileName}-useCase";

export default class ${featureClassName}Controller implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            // Lógica do Controller
            const instanceOf${featureClassName}UseCase = container.resolve<I${featureClassName}UseCase>(${featureClassName}UseCase)

            return res.status(200).json();
        } catch (error: any) {
            if (error.statusCode && error.message) {
                return res.status(error.statusCode).json({ message: error.message });
            } else {
                return res
                    .status(500)
                    .json({
                        message:
                            "Estamos passando por instabilidades, tente novamente mais tarde!",
                        errorMessage: error.message
                    });
            }
        }
    }
}
`;

    const controllerFilePath = path.join(
      controllerPath,
      `${featureClassFileName}-controller.ts`
    );
    fs.writeFileSync(controllerFilePath, controllerContent);

    console.log(`Controller criado com sucesso em: ${controllerFilePath}\n`);

    // Criação da Interface do useCase
    const interfaceUseCaseContent = `export interface I${featureClassName}UseCase {
    execute(${parameters}): Promise<${promiseOfExecuteMethod ? promiseOfExecuteMethod : 'void'}>;
}
`;

    const interfaceUseCaseFilePath = path.join(
      interfacesUseCasePath,
      `I${featureClassName}UseCase.ts`
    );
    fs.writeFileSync(interfaceUseCaseFilePath, interfaceUseCaseContent);

    console.log(
      `Interface do Caso de Uso criada com sucesso em: ${interfaceUseCaseFilePath}\n`
    );

    const dependenciesConstructor = dependenciesInjections.map(dependency => `@inject("${dependency.name}")\nprivate ${dependency.name}: ${dependency.type}`).join(', ');

    // Criação do useCase
    const useCaseContent = `import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { I${featureClassName}UseCase } from "../../../shared/interfaces/modules/${moduleName}/useCases/I${featureClassName}UseCase";

@injectable()
export default class ${featureClassName}UseCase implements I${featureClassName}UseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        ${dependenciesConstructor}
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(${parameters}): Promise<${promiseOfExecuteMethod ? promiseOfExecuteMethod : 'void'}> {
        // Lógica do Caso de Uso
    }
}
`;

    const useCaseFilePath = path.join(
      useCasesPath,
      `${featureClassFileName}-useCase.ts`
    );
    fs.writeFileSync(useCaseFilePath, useCaseContent);

    console.log(`useCase criado com sucesso!`);

    // ------Add to router

    let routerContent = fs.readFileSync(routerPath, 'utf-8');

    let newControllerImport = `import ${featureClassName}Controller from "../controllers/${featureClassFileName}-controller";
    //@ImportNewController`

    let newRouterInstance = `this.router.${httpMethod}('${endpoint}', new ${featureClassName}Controller().execute);
    //@NewController
    `
    routerContent = routerContent.replace('//@ImportNewController', newControllerImport);
    routerContent = routerContent.replace('//@NewController', newRouterInstance);

    fs.writeFileSync(routerPath, routerContent, 'utf-8');

    console.log('Controller adicionado a rota com sucesso!');

    process.exit(1);
  } catch (error) {
    console.error("Ocorreu um erro ao criar a funcionalidade:", error);
  }
}

newFeature();
