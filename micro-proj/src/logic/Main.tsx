import Parser from './Parser'
import Issuer from './Issuer';
import { QueueType } from '../common/types';
const issuer = new Issuer();
const parser = new Parser();

function main(clockCycle: number,
     instructionQueue: QueueType,
    setCurrentInstruction:(instruction:string)=>void,
setDisplayCurrentInstruction:(message:string)=>void) {
    

    let currentInstruction: string = instructionQueue.peek();
    setCurrentInstruction(currentInstruction);

    

    currentInstruction = instructionQueue.dequeue();
    setCurrentInstruction(currentInstruction);
    console.log('currentInstruction');
    console.log(currentInstruction);
    const parsedInstruction = parser.parse(currentInstruction);
    console.log('parsedInstruction');
    console.log(parsedInstruction);
    issuer.put(parsedInstruction);
}


export default main;