import code from '../assembly/input'
import Queue from './Queue';
import {
    MemoryInstruction,
    ArithmeticInstruction
}
    from './types';

class Parser {
    static instructionQueue: Queue;
    constructor() {

    }

    parseFile() {
        const instructions = code.split(/\n/);
        Parser.instructionQueue = new Queue(instructions.reverse());
        this.parse(code);


        return Parser.instructionQueue;

    }

    parse(input: string): MemoryInstruction | ArithmeticInstruction {
        const instruction = input.split(' ');
        const operation = instruction[0];
        if (operation === 'S.D' || operation === 'L.D') {
            const operands = instruction[1].split(',');
            const destination = operands[0];
            const address = operands[1];
            return {
                operation,
                destination: parseInt(destination.substring(1)),
                address: parseInt(address)
            };
        }

        const operands = instruction[1].split(',');
        const destination = operands[0];
        const source1 = operands[1];
        const source2 = operands[2];

        return {
            operation,
            destination:parseInt(destination.substring(1)),
            source1: parseInt(source1.substring(1)),
            source2: parseInt(source2.substring(1))
        };

    }

}


export default Parser;