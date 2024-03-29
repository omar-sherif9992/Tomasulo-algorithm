import INSTRUCTION from "./Instruction.enum";

export type Register = {
    name: string;
    value: number;
    reservationStageName: string | null;
}

export type ArithmeticReservationStation = {
    name: string;
    busy: boolean;
    op: string |null;
    Vj: number | null;
    Vk: number | null;
    Qj: string | null;
    Qk: string | null;
    A: number |null;
    timeLeft:number | null;
    registerDestinationIndex:number|null;
    registerDestinationValue:number|null;
    instructionIndex:number|null;
    instructionString:string;
}

export type LoadBuffer = {
    name: string;
    busy: boolean;
    effectiveAddress: number | null;
    timeLeft:number | null;
    registerDestinationIndex:number|null;
    op:INSTRUCTION.LD | null;
    registerDestinationValue:number|null;
    instructionIndex:number|null;
    instructionString:string;
}

export type StoreBuffer = {
    name: string;
    busy: boolean;
    effectiveAddress: number | null;
    V: number | null;
    Q: string | null;
    timeLeft:number |null;
    registerSourceIndex:number | null;
    op:INSTRUCTION.SD|null;
    instructionIndex:number|null;
    registerDestinationValue:number|null;
    instructionString:string;

}

// S.D f1,100 // f1 register store it in memory address(effectiveAddress) 100
// L.D f2,100 // f2 register load it to memory address(effectiveAddress) 100
export type MemoryInstruction = {
    operation: string;
    effectiveAddress: number;
    registerIndex: number;
    instructionIndex:number;
    instructionString:string;
}


export type ArithmeticInstruction = {
    operation: string;
    destinationIndex: number;
    source1Index: number;
    source2Index: number;
    instructionIndex:number;
    instructionString:string;

}


export type QueueType = {
    queue: string[];
    enqueue: (item: string) => void;
    enqueueQueue: (records: string[]) => void;
    dequeue: () => string;
    print: () => void;
    peek: () => string;
    removeItemByIndex:(index:number) => void;
    length: () => number;
};


export type latencyType = {
    'ADD.D': number,
    "SUB.D":number,
    "MUL.D":number,
    "DIV.D":number,
    "L.D":number,
    "S.D":number,
}


export type logType = {
    message: string,
    clockCycle: number
};


export type cycleTableType={
    timeLeft:number;
    instructionIndex:number;
    instruction:string;
    issueCycle:number|null;
    startExecuteCycle:number|null;
    endExecute:number|null;
    writeResultCycle:number|null;
};
