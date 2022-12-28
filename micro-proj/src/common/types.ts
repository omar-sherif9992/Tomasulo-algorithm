export type Register = {
    name: string;
    value: number;
    reservationStageName: string | null;
}

export type ArithmeticReservationStation = {
    name:string;
    busy: boolean;
    op: string;
    Vj: number | null;
    Vk: number | null;
    Qj: string | null;
    Qk: string | null;
    A: number;
}

export type LoadBuffer = {
    name:string;
    busy: boolean;
    effectiveAddress: number;
}

export type StoreBuffer = {
    name:string;
    busy: boolean;
    effectiveAddress: number;
    value: number | null;
    Q: string | null;

}

// S.D f1,100 // f1 register store it in memory address(effectiveAddress) 100
// L.D f2,100 // f2 register load it to memory address(effectiveAddress) 100
export type MemoryInstruction = {
    operation: string;
    effectiveAddress: number;
    register: number;
}


export type ArithmeticInstruction = {
    operation: string;
    destination: number;
    source1: number;
    source2: number;
}


export type QueueType={
    queue: string[];
    addToQueue: (item: string) => void;
    removeFromQueue: (item: any) => void;
    dequeue: () => string;
    print: () => void;
    peek: () => string;
    length: () => number;
};