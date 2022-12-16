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
    // parses the input to a MemoryInstruction or ArithmeticInstruction object
    parse(input: string): MemoryInstruction | ArithmeticInstruction {
        const instruction = input.split(' ');
        const operation = instruction[0];

        if (operation === 'S.D' || operation === 'L.D') {
            const operands = instruction[1].split(',');
            const register = operands[0];
            const effectiveAddress = operands[1];
            return {
                operation,
                register: parseInt(register.substring(1)), // the register have index of register in register file
                effectiveAddress: parseInt(effectiveAddress)
            } as MemoryInstruction;
        }

        const operands = instruction[1].split(',');
        const destination = operands[0];
        const source1 = operands[1];
        const source2 = operands[2];

        return {
            operation,
            destination:parseInt(destination.substring(1)),
            source1: parseInt(source1.substring(1)), // the source 1 register have index of register in register file
            source2: parseInt(source2.substring(1)) // the source 2 register have index of register in register file
        } as ArithmeticInstruction;

    }

}


export default Parser;