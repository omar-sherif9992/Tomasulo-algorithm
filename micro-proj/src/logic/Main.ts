import { useState } from 'react';
import Parser from './Parser'
import Issuer from './Issuer';
import Queue from './Queue';
const issuer = new Issuer();
const parser = new Parser();


function main(clockCycle: number, instructionQueue: Queue) {

    let currentInstruction: string = instructionQueue.peek();

    currentInstruction = instructionQueue.dequeue();
    console.log('currentInstruction');
    console.log(currentInstruction);
    const parsedInstruction = parser.parse(currentInstruction);
    console.log('parsedInstruction');
    console.log(parsedInstruction);
    issuer.put(parsedInstruction);






}


export default main;