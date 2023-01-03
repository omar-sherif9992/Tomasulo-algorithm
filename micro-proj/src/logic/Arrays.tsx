import INSTRUCTION from "../common/Instruction.enum";
import { LoadBuffer, Register, ArithmeticReservationStation, StoreBuffer } from "../common/types";

const RegisterFile: Register[] = new Array(32).fill(1).map((_, i) => (
    {
        name: 'F' + i,
        value: i,
        reservationStageName: null //if null means value up to date
    }
));

const MemoryArray: number[] = new Array(32).fill(1).map((_, i) => (
    i
));

const AddReservationStations: ArithmeticReservationStation[] = new Array(3).fill(1).map((_, i) => {
    return {
        name: 'A' + i,
        busy: false,
        op: null,
        Vj: null,
        Vk: null,
        Qj: null,
        Qk: null,
        A: null,
        timeLeft: null,
        registerDestinationIndex:null,
        registerDestinationValue:null,
        instructionIndex:null,
        instructionString:null
    }
});

const MulReservationStations: ArithmeticReservationStation[] = new Array(2).fill(1).map((_, i) => {
    return {
        name: 'M' + i,
        busy: false,
        op: null,
        Vj: null,
        Vk: null,
        Qj: null,
        Qk: null,
        A: null,
        timeLeft: null,
        registerDestinationIndex:null,
        registerDestinationValue:null,
        instructionIndex:null,
        instructionString:null

    }
});

const LoadBuffers: LoadBuffer[] = new Array(2).fill(1).map((_, i) => {
    return {
        name: 'L' + i,
        busy: false,
        effectiveAddress: null,
        timeLeft:null,
        registerDestinationIndex:null,
        op:null,
        registerDestinationValue:null,
        instructionIndex:null,
        instructionString:null

    }
});
const StoreBuffers: StoreBuffer[] = new Array(2).fill(1).map((_, i) => {
    return {
        name: 'S' + i,
        busy: false,
        effectiveAddress: null,
        V: null, // to be saved in memory
        Q: null,
        timeLeft: null,
        registerSourceIndex:null,
        op:null,    
        instructionIndex:null,
        registerDestinationValue:null,
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