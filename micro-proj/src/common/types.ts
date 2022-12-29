import INSTRUCTION from "./Instruction.enum";

export type Register = {
    name: string;
    value: number;
    reservationStageName: string | null;
}

export type ArithmeticReservationStation = {
    name: string;
    busy: boolean;
    op: string;
    Vj: number | null;
    Vk: number | null;
    Qj: string | null;
    Qk: string | null;
    A: number;
    timeLeft:number;
    registerDestinationIndex:number|null;
}

export type LoadBuffer = {
    name: string;
    busy: boolean;
    effectiveAddress: number;
    timeLeft:number;
    registerDestinationIndex:number|null;
    op:INSTRUCTION.LD | null;
}

export type StoreBuffer = {
    name: string;
    busy: boolean;
    effectiveAddress: number;
    value: number | null;
    Q: string | null;
    timeLeft:number;
    registerSourceIndex:number | null;
    op:INSTRUCTION.SD|null;
}

// S.D f1,100 // f1 register store it in memory address(effectiveAddress) 100
// L.D f2,100 // f2 register load it to memory address(effectiveAddress) 100
export type MemoryInstruction = {
    operation: string;
    effectiveAddress: number;
    registerIndex: number;
}


export type ArithmeticInstruction = {
    operation: string;
    destinationIndex: number;
    source1Index: number;
    source2Index: number;
}


export type QueueType = {
    queue: string[];
    enqueue: (item: string) => void;
    enqueueQueue: (records: string[]) => void;
    dequeue: () => string;
    print: () => void;
    peek: () => string;
    length: () => number;
};


export type latencyType = {
    'ADD.D': number,
    "SUB.D":number,
    "MUL.D":number,
    "DIV.D":number,
    "LD.D":number,
    "SD.D":number,
}


export type logType = {
    message: string,
    clockCycle: number
}