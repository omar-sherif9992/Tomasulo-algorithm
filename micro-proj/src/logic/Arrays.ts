import { LoadBuffer, Register, ReservationStation, StoreBuffer } from "./types";

const RegisterArray: Register[] = new Array(32).fill(1).map((_, i) => (
    {
        name: 'F' + i,
        value: i,
        reservationStage: null
    }
));

const MemoryArray: number[] = new Array(32).fill(1).map((_, i) => (
    i
));

const AddReservationStations: ReservationStation[] = new Array(3).fill(1).map((_, i) => {
    return {
        name: 'A' + i,
        busy: false,
        op: '',
        Vj: null,
        Vk: null,
        Qj: null,
        Qk: null,
        A: 0
    }
});

const MulReservationStations: ReservationStation[] = new Array(2).fill(1).map((_, i) => {
    return {
        name: 'M' + i,
        busy: false,
        op: '',
        Vj: null,
        Vk: null,
        Qj: null,
        Qk: null,
        A: 0
    }
});

const LoadBuffers: LoadBuffer[] = new Array(2).fill(1).map((_, i) => {
    return {
        name: 'L' + i,
        busy: false,
        address: 0
    }
});
const StoreBuffers: StoreBuffer[] = new Array(2).fill(1).map((_, i) => {
    return {
        name: 'S' + i,
        busy: false,
        address: 0,
        value: null, // to be saved in memory
        Q: null
    }
});


export { RegisterArray, MulReservationStations, StoreBuffers, LoadBuffers, AddReservationStations, MemoryArray };