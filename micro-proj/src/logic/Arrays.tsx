import { LoadBuffer, Register, ArithmeticReservationStation, StoreBuffer } from "../common/types";

const RegisterFile: Register[] = new Array(32).fill(1).map((_, i) => (
    {
        name: 'F' + i,
        value: i,
        reservationStageName: null
    }
));

const MemoryArray: number[] = new Array(32).fill(1).map((_, i) => (
    i
));

const AddReservationStations: ArithmeticReservationStation[] = new Array(3).fill(1).map((_, i) => {
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

const MulReservationStations: ArithmeticReservationStation[] = new Array(2).fill(1).map((_, i) => {
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
        effectiveAddress: 0
    }
});
const StoreBuffers: StoreBuffer[] = new Array(2).fill(1).map((_, i) => {
    return {
        name: 'S' + i,
        busy: false,
        effectiveAddress: 0,
        value: null, // to be saved in memory
        Q: null
    }
});

function printStations(){
    console.log('AddReservationStations');
    console.log(AddReservationStations);
    console.log('MulReservationStations');
    console.log(MulReservationStations);
    console.log('LoadBuffers');
    console.log(LoadBuffers);
    console.log('StoreBuffers');
    console.log(StoreBuffers);
} 


export { RegisterFile, MulReservationStations, StoreBuffers, LoadBuffers, AddReservationStations, MemoryArray ,printStations};