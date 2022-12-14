export type Register = {
    name: string;
    value: number;
    reservationStage: string | null;
}

export type ReservationStation = {
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
    address: number;
}

export type StoreBuffer = {
    name:string;
    busy: boolean;
    address: number;
    value: number | null;
    Q: string | null;

}


export type MemoryInstruction = {
    operation: string;
    destination: number;
    address: number;
}


export type ArithmeticInstruction = {
    operation: string;
    destination: number;
    source1: number;
    source2: number;
}