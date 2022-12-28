import { ArithmeticInstruction, MemoryInstruction, ArithmeticReservationStation, logType, latencyType } from '../common/types';
import { RegisterFile, AddReservationStations, MulReservationStations, LoadBuffers, StoreBuffers, printStations } from './Arrays';
import INSTRUCTION from '../common/Instruction.enum'
const instructionSyntaxError = 'Syntax Error Instruction';

class Issuer {
    setDisplayLog: (log: logType) => void;
    clockCycle: number;
    latency: latencyType;
    setRegisterFile: (registerFile: typeof RegisterFile) => void;
    setAddReservationStations: (addReservationStations: typeof AddReservationStations) => void;
    setMulReservationStations: (mulReservationStations: typeof MulReservationStations) => void;
    setLoadBuffers: (loadBuffers: typeof LoadBuffers) => void;
    setStoreBuffers: (storeBuffers: typeof StoreBuffers) => void;
    setMemoryArray: (memoryArray: number[]) => void;
    registerFile: typeof RegisterFile;
    addReservationStations: typeof AddReservationStations;
    mulReservationStations: typeof MulReservationStations;
    loadBuffers: typeof LoadBuffers;
    storeBuffers: typeof StoreBuffers;
    memoryArray: number[]

    constructor(
        setDisplayLog: (log: logType) => void,
        clockCycle: number,
        latency: latencyType,
        setRegisterFile: (registerFile: typeof RegisterFile) => void,
        setAddReservationStations: (addReservationStations: typeof AddReservationStations) => void,
        setMulReservationStations: (mulReservationStations: typeof MulReservationStations) => void,
        setLoadBuffers: (loadBuffers: typeof LoadBuffers) => void,
        setStoreBuffers: (storeBuffers: typeof StoreBuffers) => void,
        setMemoryArray: (memoryArray: number[]) => void,
        registerFile: typeof RegisterFile,
        addReservationStations: typeof AddReservationStations,
        mulReservationStations: typeof MulReservationStations,
        loadBuffers: typeof LoadBuffers,
        storeBuffers: typeof StoreBuffers,
        memoryArray: number[],
    ) {

        this.setDisplayLog = setDisplayLog;
        this.clockCycle = clockCycle;
        this.setRegisterFile = setRegisterFile;
        this.setAddReservationStations = setAddReservationStations;
        this.setMulReservationStations = setMulReservationStations;
        this.setLoadBuffers = setLoadBuffers;
        this.setStoreBuffers = setStoreBuffers;
        this.setMemoryArray = setMemoryArray;
        this.latency = latency;
        this.registerFile = registerFile;
        this.addReservationStations = addReservationStations;
        this.mulReservationStations = mulReservationStations;
        this.loadBuffers = loadBuffers;
        this.storeBuffers = storeBuffers;
        this.memoryArray = memoryArray;

        

    }
    // if false meaning you need to stall instruction queue and not dequeue
    put(instruction: ArithmeticInstruction | MemoryInstruction): boolean {
        let stallFlag: boolean;
        if (instruction.operation === INSTRUCTION.SD || instruction.operation === INSTRUCTION.LD) {
            stallFlag = this.issueMemoryInstruction(instruction as MemoryInstruction);
        } else if (instruction.operation === INSTRUCTION.ADD || instruction.operation === INSTRUCTION.SUB || instruction.operation === INSTRUCTION.MUL || instruction.operation === INSTRUCTION.DIV) {
            stallFlag = this.issueArithmeticInstruction(instruction as ArithmeticInstruction);
        }
        else {
            throw new Error(instructionSyntaxError);
        }
        printStations();
        // if !stallFlag true then we need to stall instruction queue dequeuing otherwise execute 
        return !stallFlag;
    }

    issueArithmeticInstruction(instruction: ArithmeticInstruction): boolean {
        let ReservationStation: ArithmeticReservationStation[];
        // to know which reservation station to go for
        if (instruction.operation === INSTRUCTION.ADD || instruction.operation === INSTRUCTION.SUB) {
            ReservationStation = this.addReservationStations;
            this.setDisplayLog({ message: 'checking Add reservation station for unbusy station', clockCycle: this.clockCycle });
        }
        else if (instruction.operation === INSTRUCTION.MUL || instruction.operation === INSTRUCTION.DIV) {
            ReservationStation = this.mulReservationStations;
            this.setDisplayLog({ message: 'checking Mul reservation station for unbusy station', clockCycle: this.clockCycle })
        }
        for (let stationSlot = 0; stationSlot < ReservationStation.length; stationSlot++) {
            console.log(stationSlot);
            if (!ReservationStation[stationSlot].busy) {
                ReservationStation[stationSlot] = {
                    name: ReservationStation[stationSlot].name, // the name of reservation station normally
                    busy: true,
                    op: instruction.operation,
                    Vj: RegisterFile[instruction.source1].reservationStageName ? null : RegisterFile[instruction.source1].value, // if the found register is reserved by reservation station then the value is null otherwise the value of the register
                    Vk: RegisterFile[instruction.source2].reservationStageName ? null : RegisterFile[instruction.source2].value,// if the found register is reserved by reservation station then the value is null otherwise the value of the register
                    Qj: RegisterFile[instruction.source1].reservationStageName ? RegisterFile[instruction.source1].reservationStageName : null,// if the found register is reserved by reservation station then the name of the reservation station otherwise null
                    Qk: RegisterFile[instruction.source2].reservationStageName ? RegisterFile[instruction.source2].reservationStageName : null,// if the found register is reserved by reservation station then the name of the reservation station otherwise null
                    A: 0,
                    timeLeft: this.latency[instruction.operation],
                };
                // to know which register is reserved by which reservation station
                RegisterFile[instruction.destination].reservationStageName = ReservationStation[stationSlot].name;

                this.setDisplayLog({ message: `issue instruction to station ${ReservationStation[stationSlot].name} Un-Busy `, clockCycle: this.clockCycle })

                return true;

            }
        }
        this.setDisplayLog({ message: `unable to issue the instruction no station ${ReservationStation[0].name} is Un-Busy `, clockCycle: this.clockCycle })

        return false;
    }



    issueMemoryInstruction(instruction: MemoryInstruction): boolean {
        if (instruction.operation === INSTRUCTION.SD) {
            for (let stationSlot = 0; stationSlot < StoreBuffers.length; stationSlot++) {
                // TODO: store and load same address missing
                if (!StoreBuffers[stationSlot].busy) {
                    this.storeBuffers[stationSlot] = {
                        name: StoreBuffers[stationSlot].name,
                        busy: true,
                        effectiveAddress: instruction.effectiveAddress,
                        value: RegisterFile[instruction.register].reservationStageName ? null : RegisterFile[instruction.register].value,
                        Q: RegisterFile[instruction.register].reservationStageName ? RegisterFile[instruction.register].reservationStageName : null,
                        timeLeft: this.latency[instruction.operation],
                    };
                    this.setDisplayLog({ message: `issue instruction to store ${StoreBuffers[stationSlot].name}  buffer `, clockCycle: this.clockCycle })
                    return true;
                }
            }
            this.setDisplayLog({ message: `unable to issue the instruction no store buffer is Un-Busy `, clockCycle: this.clockCycle })
            return false;
        }
        else if ((instruction.operation) === INSTRUCTION.LD) {
            for (let stationSlot = 0; stationSlot < LoadBuffers.length; stationSlot++) {
                // TODO: store and load same address missing
                if (!LoadBuffers[stationSlot].busy) {
                    this.loadBuffers[stationSlot] = {
                        name: LoadBuffers[stationSlot].name,
                        busy: true,
                        effectiveAddress: instruction.effectiveAddress,
                        timeLeft: this.latency[instruction.operation],
                        
                    };
                    // make the according register stall for the this load
                    this.registerFile[instruction.register] = {
                        name: RegisterFile[instruction.register].name,
                        value: 0,
                        reservationStageName: LoadBuffers[stationSlot].name,

                    };
                    this.setDisplayLog({ message: `issue instruction to load ${LoadBuffers[stationSlot].name}  buffer `, clockCycle: this.clockCycle })
                    return true;
                }
            }
            this.setDisplayLog({ message: `unable to issue the instruction no load buffer is Un-Busy `, clockCycle: this.clockCycle })
            return false;
        }

    }
}




export default Issuer;