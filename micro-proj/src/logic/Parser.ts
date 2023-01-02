import {
    MemoryInstruction,
    ArithmeticInstruction,
    logType
}
    from '../common/types';

class Parser {
    setDisplayLog: (log: logType) => void;
    clockCycle:number;
    constructor(setDisplayLog: (log: logType) => void,  clockCycle:number) {
        this.setDisplayLog = setDisplayLog;
        this.clockCycle=clockCycle;
    }

    // parses the input file to a Queue of instructions
    parseFile(code: string) {
        const instructions = code.split(/\n/);
       // Parser.instructionQueue = new Queue(instructions.reverse());
        //return Parser.instructionQueue;

        const cleanedRecords= instructions
        .filter((record)=>record!=='' && record.trim()!=='');
        return cleanedRecords;

    }
    // parses the input to a MemoryInstruction or ArithmeticInstruction object
    parse(input: string,instructionIndex:number): MemoryInstruction | ArithmeticInstruction {
        console.log('input');
        console.log(input);

        if(typeof input ==='string'){
        const instruction = input.trim().split(' ');
        const operation = instruction[0].trim();

        if (operation === 'S.D' || operation === 'L.D') {
            const operands = instruction[1].trim().split(',');
            const register = operands[0].trim();
            const effectiveAddress = operands[1].trim();
            return {
                operation,
                registerIndex: parseInt(register.substring(1)), // the register have index of register in register file
                effectiveAddress: parseInt(effectiveAddress), // its place in the memory,
                instructionIndex,
            } as MemoryInstruction;
        }

        const operands = instruction[1].trim().split(',');
        const destination = operands[0].trim();
        const source1 = operands[1].trim();
        const source2 = operands[2].trim();

        return {
            operation,
            destinationIndex: parseInt(destination.substring(1)),
            source1Index: parseInt(source1.substring(1)), // the source 1 register have index of register in register file
            source2Index: parseInt(source2.substring(1)), // the source 2 register have index of register in register file
            instructionIndex,
        } as ArithmeticInstruction;

    }}

}


export default Parser;