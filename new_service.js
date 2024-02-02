const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

async function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer)
        })
    })
}

async function newService() {
    const serviceName = await askQuestion('Informe o nome do seu serviço: ');

    let pathService = path.join(__dirname, 'src', 'shared', 'services', `${serviceName}Service`);
    let newService = path.join(pathService, `${serviceName}Service.ts`);
    let interfaceService = path.join(pathService, `I${serviceName}Service.ts`);
    let pathContainerDependencies = path.join(__dirname, 'src', 'shared', 'container', 'index.ts');
    let containerFileReader = fs.readFileSync(pathContainerDependencies, 'utf-8');

try {
    fs.mkdirSync(pathService)

    let templateService = `import { I${serviceName}Service } from './I${serviceName}Service'
    
export default class ${serviceName}Service implements I${serviceName}Service {

}`
        let templateIService = `export interface I${serviceName}Service {
    
}`
    
        fs.writeFileSync(newService, templateService)
        fs.writeFileSync(interfaceService, templateIService);
    
        let importServiceTemplate = `import ${serviceName}Service from '../services/${serviceName}Service/${serviceName}Service';
import { I${serviceName}Service } from '../services/${serviceName}Service/I${serviceName}Service'
//@ImportService`

let newServiceTemplate = `container.register<I${serviceName}Service>(
  "${serviceName}Service",
  ${serviceName}Service
)

//@NewService`
    
        containerFileReader = containerFileReader.replace('//@ImportService', importServiceTemplate);
        containerFileReader = containerFileReader.replace('//@NewService', newServiceTemplate);
    
        fs.writeFileSync(pathContainerDependencies, containerFileReader, 'utf-8');
        
    
        console.log(`Serviço ${serviceName} criado com sucesso!`)
    
        process.exit(1);
} catch (error) {
    console.error(error);
}
}

newService();
