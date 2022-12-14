import Parser from './Parser'
import Issuer from './Issuer';

const parser = new Parser();
const issuer = new Issuer();
function main() {

    const instructionQueue = parser.parseFile();
    let currentInstruction: string = instructionQueue.peek();




    while (instructionQueue.length() > 0) {
        currentInstruction = instructionQueue.dequeue();
        console.log('currentInstruction');
        console.log(currentInstruction);
        const parsedInstruction = parser.parse(currentInstruction);
        console.log('parsedInstruction');
        console.log(parsedInstruction);
        issuer.put(parsedInstruction);




        /* 
                if (!currentInstruction) {
                    console.log('Wrong instructions to execute');
                } */
        // parser.parse(currentInstruction);

    }
}


export default main;