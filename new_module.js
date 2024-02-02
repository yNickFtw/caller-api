const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function newModule() {
  const moduleName = await askQuestion("Informe o nome do módulo: ");
  const schemaName = await askQuestion("Informe o nome do schema: ");

  if (!moduleName) {
    console.error("Por favor, forneça o nome do módulo como argumento.");
    process.exit(1);
  }

  if (!schemaName) {
    console.error("Por favor, forneça o nome do módulo como argumento.");
    process.exit(1);
  }

  const modulePath = path.join(__dirname, "src", "modules", moduleName);
  const interfacePath = path.join(
    __dirname,
    "src",
    "shared",
    "interfaces",
    "modules",
    moduleName
  );
  const mainRouterPath = path.join(__dirname, 'src', 'shared', 'http', 'router.ts');

  if (fs.existsSync(modulePath)) {
    console.error(`O módulo "${moduleName}" já existe.`);
    process.exit(1);
  }

  const moduleDirectories = [
    "controllers",
    "useCases",
    "repository",
    "entity",
    "router",
  ];
  const interfaceDirectories = ["repository", "useCases"];

  try {
    fs.mkdirSync(modulePath);

    moduleDirectories.forEach((dir) => {
      const dirPath = path.join(modulePath, dir);
      fs.mkdirSync(dirPath);
    });

    fs.mkdirSync(interfacePath);

    interfaceDirectories.forEach((dir) => {
      const dirPath = path.join(interfacePath, dir);
      fs.mkdirSync(dirPath);
    });

    // --------Repository

    let repositoryPath = path.join(
      modulePath,
      "repository",
      `${moduleName}.repository.ts`
    );

    let templateModuleRepository = `import { I${schemaName} } from "../../../shared/interfaces/modules/${moduleName}/I${schemaName}";
import { I${schemaName}Repository } from "../../../shared/interfaces/modules/${moduleName}/repository/I${schemaName}Repository";
import { ${schemaName} } from "../entity/${moduleName}.schema";

export default class ${schemaName}Repository implements I${schemaName}Repository {
    
}`;

    fs.writeFileSync(repositoryPath, templateModuleRepository);

    // -----------IRepository

    let repositoryInterfacePath = path.join(
      interfacePath,
      "repository",
      `I${schemaName}Repository.ts`
    );

    let templateRepositoryInterface = `export interface I${schemaName}Repository {

}`;

  // ---------InterfaceISchema

    fs.writeFileSync(repositoryInterfacePath, templateRepositoryInterface);

    let interfaceISchema = path.join(interfacePath, `I${schemaName}.ts`);

    let templateInterfaceSchema = `export interface I${schemaName} {

  }`;

    fs.writeFileSync(interfaceISchema, templateInterfaceSchema);

  // ---------Schema
  let schemaEntityPath = path.join(modulePath, 'entity', `${moduleName}.schema.ts`)

  let templateSchema = `import { DataTypes } from 'sequelize'
import database from "../../../database/config";

const ${schemaName} = database.define('${moduleName}', {

})

export { ${schemaName} };`

  fs.writeFileSync(schemaEntityPath, templateSchema);

  // ----------Router Path
  let routerSchemaPath = path.join(modulePath, 'router', `${moduleName}.router.ts`);

  let routerTemplate = `import { IRouter } from "../../../shared/interfaces/globals/IRouter";
  import { Router } from "express";
  

export default class ${schemaName}Router implements IRouter {
    router: Router;
  
    constructor() {
        this.router = Router()
        //@NewController
    }
  
    public init(): Router {
        return this.router;
    }
}`

  fs.writeFileSync(routerSchemaPath, routerTemplate, 'utf-8');

  // ------------ Main Router
  let mainRouterContent = fs.readFileSync(mainRouterPath, 'utf-8');

  let newImportRouter = `import ${schemaName}Router from "../../modules/${moduleName}/router/${moduleName}.router";
//@ImportRouter`

  let newInstanceRouterTemplate = `private ${moduleName}Router = container.resolve<IRouter>(${schemaName}Router),
//@InstanceRouter`

  let initInstanceRouterTemplate = `this.router.use('/${moduleName}s', this.${moduleName}Router.init());
//@NewInitInstance`

  mainRouterContent = mainRouterContent.replace('//@ImportRouter', newImportRouter);

  mainRouterContent = mainRouterContent.replace('//@InstanceRouter', newInstanceRouterTemplate);

  mainRouterContent = mainRouterContent.replace('//@NewInitInstance', initInstanceRouterTemplate);

  fs.writeFileSync(mainRouterPath, mainRouterContent, 'utf-8');

  // --------Injection Dependency
  let addImportInjectionTemplate = `import { I${schemaName}Repository } from '../interfaces/modules/${moduleName}/repository/I${schemaName}Repository'
import ${schemaName}Repository from '../../modules/${moduleName}/repository/${moduleName}.repository'
//@ImportInjection`;

  let addInjectionTemplate = `
container.register<I${schemaName}Repository>(
"${schemaName}Repository",
${schemaName}Repository
)
//@InjectionDependecy`

  let addImportInjectionRouterTemplate = `import ${schemaName}Router from '../../modules/${moduleName}/router/${moduleName}.router'
//@ImportRouter`

  let addInjectionRouterTemplate = `
container.register<IRouter>(
  "${schemaName}Router",
  ${schemaName}Router
)
//@RouterInjection`

  let containerPath = path.join(__dirname, 'src', 'shared', 'container', 'index.ts')

  let containerContentOfDependencies = fs.readFileSync(containerPath, 'utf-8');

  containerContentOfDependencies = containerContentOfDependencies.replace('//@ImportInjection', addImportInjectionTemplate);
  containerContentOfDependencies = containerContentOfDependencies.replace('//@ImportRouter', addImportInjectionRouterTemplate);
  containerContentOfDependencies = containerContentOfDependencies.replace('//@InjectionDependecy', addInjectionTemplate);
  containerContentOfDependencies = containerContentOfDependencies.replace('//@RouterInjection', addInjectionRouterTemplate);

  fs.writeFileSync(containerPath, containerContentOfDependencies, 'utf-8');

    console.log(`Módulo "${moduleName}" criado com sucesso.`);

    process.exit();
  } catch (error) {
    console.error("Ocorreu um erro ao criar o módulo:", error);
  }
}

newModule();
