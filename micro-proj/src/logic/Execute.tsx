import { ArithmeticInstruction, MemoryInstruction, ArithmeticReservationStation, logType, latencyType, StoreBuffer, LoadBuffer } from '../common/types';
import { RegisterFile, AddReservationStations, MulReservationStations, LoadBuffers, StoreBuffers, printStations } from './Arrays';
import INSTRUCTION from '../common/Instruction.enum'
const instructionSyntaxError = 'Syntax Error Instruction';

class Execute {
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
   
    executeInstruction(instruction: ArithmeticReservationStation | LoadBuffer | StoreBuffer) {
        switch (instruction.operation) {
            case INSTRUCTION.ADD:
                this.executeAdd(instruction as ArithmeticReservationStation);
                break;
            case INSTRUCTION.SUB:
                this.executeSub(instruction as ArithmeticReservationStation);
                break;
            case INSTRUCTION.MUL:
                this.executeMul(instruction as ArithmeticReservationStation);
                break;
            case INSTRUCTION.DIV:
                this.executeDiv(instruction as ArithmeticReservationStation);
                break;
            case INSTRUCTION.LD:
                this.executeLoad(instruction as LoadBuffer);
                break;
            case INSTRUCTION.SD:
                this.executeStore(instruction as StoreBuffer);
                break;
            default:
                this.setDisplayLog({ message: instructionSyntaxError, clockCycle: this.clockCycle });
                break;
        }
    }

    executeAdd(instruction: ArithmeticReservationStation) {
        const { } = instruction;
        const source1Value = this.registerFile[source1].value;
        const source2Value = this.registerFile[source2].value;
        const result = source1Value + source2Value;
        this.registerFile[destination].value = result;
        this.setRegisterFile(this.registerFile);
        this.setDisplayLog({ message: `ADD.D R${destination} R${source1} R${source2}`, clockCycle: this.clockCycle });
    }

    executeSub(instruction: ArithmeticReservationStation) {
        const { destination, source1, source2 } = instruction;
        const source1Value = this.registerFile[source1].value;
        const source2Value = this.registerFile[source2].value;
        const result = source1Value - source2Value;
        this.registerFile[destination].value = result;
        this.setRegisterFile(this.registerFile);
        this.setDisplayLog({ message: `SUB.D R${destination} R${source1} R${source2}`, clockCycle: this.clockCycle });
    }

    executeMul(instruction: ArithmeticReservationStation) {
        const { destination, source1, source2 } = instruction;
        const source1Value = this.registerFile[source1].value;
        const source2Value = this.registerFile[source2].value;
        const result = source1Value * source2Value;
        this.registerFile[destination].value = result;
        this.setRegisterFile(this.registerFile);
        this.setDisplayLog({ message: `MUL.D R${destination} R${source1} R${source2}`, clockCycle: this.clockCycle });
    }

    executeDiv(instruction: ArithmeticReservationStation) {
        const { destination, source1, source2 } = instruction;
        const source1Value = this.registerFile[source1].value;
        const source2Value = this.registerFile[source2].value;
        const result = source1Value / source2Value;
        this.registerFile[destination].value = result;
        this.setRegisterFile(this.registerFile);
        this.setDisplayLog({ message: `DIV.D R${destination} R${source1} R${source2}`, clockCycle: this.clockCycle });
    }

    executeLoad(instruction: MemoryInstruction) {
        const { effectiveAddress, register } = instruction;
        const memoryValue = this.memoryArray[effectiveAddress];
        this.registerFile[register].value = memoryValue;
        this.setRegisterFile(this.registerFile);
        this.setDisplayLog({ message: `LD.D R${register} effective address: ${effectiveAddress}`, clockCycle: this.clockCycle });
    }

    executeStore(instruction: MemoryInstruction) {
        const { effectiveAddress, register } = instruction;
        const registerValue = this.registerFile[register].value;
        const newMemory=[...this.memoryArray];
        
        newMemory[effectiveAddress] = registerValue;
        this.setMemoryArray(newMemory);
        this.setDisplayLog({ message: `SD.D R${destination} R${source1} R${source2}`, clockCycle: this.clockCycle });
    }

    execute() {
        this.clockCycle++;
        this.setDisplayLog({ message: `Clock Cycle: ${this.clockCycle}`, clockCycle: this.clockCycle });
        this.executeAddReservationStations();
        this.executeMulReservationStations();
        this.executeLoadBuffers();
        this.executeStoreBuffers();
    }

    executeAddReservationStations() {
        this.addReservationStations.forEach((station, index) => {
            if (station.busy && station.timeLeft === 0) {
                this.executeInstruction(station.instruction);
                this.addReservationStations[index] = {
                    instruction: null,
                    busy: false,
                    timeLeft: 0,
                };
                this.setAddReservationStations(this.addReservationStations);
            } else if (station.busy) {
                this.addReservationStations[index].timeLeft--;
                this.setAddReservationStations(this.addReservationStations);
            }
        });
    }

    executeMulReservationStations() {
        this.mulReservationStations.forEach((station, index) => {
            if (station.busy && station.timeLeft === 0) {
                this.executeInstruction(station.instruction);
                this.mulReservationStations[index] = {
                    instruction: null,
                    busy: false,
                    latency: 0,
                };
                this.setMulReservationStations(this.mulReservationStations);
            } else if (station.busy) {
                this.mulReservationStations[index].latency--;
                this.setMulReservationStations(this.mulReservationStations);
            }
        });
    }

    executeLoadBuffers() {
        this.loadBuffers.forEach((buffer, index) => {
            if (buffer.busy && buffer.timeLeft === 0) {
                this.executeInstruction(buffer.instruction);
                this.loadBuffers[index] = {
                    instruction: null,
                    busy: false,
                    latency: 0,
                };
                this.setLoadBuffers(this.loadBuffers);
            } else if (buffer.busy) {
                this.loadBuffers[index].timeLeft--;
                this.setLoadBuffers(this.loadBuffers);
            }
        });
    }

    executeStoreBuffers() {
        this.storeBuffers.forEach((buffer, index) => {
            if (buffer.busy && buffer.timeLeft === 0) {
                this.executeInstruction(buffer.instruction);
                this.storeBuffers[index] = {
                    instruction: null,
                    busy: false,
                    latency: 0,
                };
                this.setStoreBuffers(this.storeBuffers);
            } else if (buffer.busy) {
                this.storeBuffers[index].timeLeft--;
                this.setStoreBuffers(this.storeBuffers);
            }
        });
    }

        
}




export default Execute;