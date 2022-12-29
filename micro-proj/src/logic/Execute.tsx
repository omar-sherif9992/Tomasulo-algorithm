import {  ArithmeticReservationStation, logType, latencyType, StoreBuffer, LoadBuffer } from '../common/types';
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
        switch (instruction.op) {
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
        const {  registerDestinationIndex,Vk, Vj } = instruction;
        if(registerDestinationIndex && Vj && Vk){
        const source1Value = Vj;
        const source2Value = Vk;
        const result = source1Value + source2Value;
        this.registerFile[registerDestinationIndex].value = result;
        this.setRegisterFile(this.registerFile);
        this.setDisplayLog({ message: `ADD.D R${registerDestinationIndex}=${source1Value} +${source2Value}`, clockCycle: this.clockCycle });
        }
    }

    executeSub(instruction: ArithmeticReservationStation) {
        const {  registerDestinationIndex,Vk, Vj } = instruction;
        if(registerDestinationIndex && Vj && Vk){
        const source1Value = Vj;
        const source2Value = Vk;
        const result = source1Value - source2Value;
        this.registerFile[registerDestinationIndex].value = result;
        this.setRegisterFile(this.registerFile);
        this.setDisplayLog({ message: `SUB.D R${registerDestinationIndex}=${source1Value}-${source2Value}`, clockCycle: this.clockCycle });
    }
    }

    executeMul(instruction: ArithmeticReservationStation) {
        const {  registerDestinationIndex,Vk, Vj } = instruction;
        if(registerDestinationIndex && Vj && Vk){
        const source1Value = Vj;
        const source2Value = Vk;
        const result = source1Value * source2Value;
        const newRegisterFile = [...this.registerFile];
        newRegisterFile[registerDestinationIndex].value = result;

        this.setRegisterFile(newRegisterFile);
        this.setDisplayLog({ message: `MUL.D R${registerDestinationIndex}=${Vj}*${Vk}`, clockCycle: this.clockCycle });
        }
    }

    executeDiv(instruction: ArithmeticReservationStation) {
        const { registerDestinationIndex, Vj, Vk } = instruction;
        if(registerDestinationIndex && Vj && Vk){
        const source1Value = Vj;
        const source2Value = Vk;
        const result = source1Value / source2Value;
        const newRegisterFile = [...this.registerFile];
        newRegisterFile[registerDestinationIndex].value = result;
        this.setRegisterFile(newRegisterFile);
        this.setDisplayLog({ message: `DIV.D R${registerDestinationIndex}=${Vj}/${Vk}`, clockCycle: this.clockCycle });
        }
    }

    executeLoad(instruction: LoadBuffer) {
        const { effectiveAddress, registerDestinationIndex } = instruction;
        if(effectiveAddress && registerDestinationIndex){
        const memoryValue = this.memoryArray[effectiveAddress];
        const newRegisterFile = [...this.registerFile];

        newRegisterFile[registerDestinationIndex].value = memoryValue;
        this.setRegisterFile(newRegisterFile);
        this.setDisplayLog({ message: `LD.D R${registerDestinationIndex} from  M[${effectiveAddress}]`, clockCycle: this.clockCycle });
        }
    }

    executeStore(instruction: StoreBuffer) {
        const { effectiveAddress, registerSourceIndex } = instruction;
        if(registerSourceIndex && effectiveAddress){
        const registerSource = this.registerFile[registerSourceIndex];
        const newMemory=[...this.memoryArray];
        newMemory[effectiveAddress] = registerSource.value;
        this.setMemoryArray(newMemory);
        this.setDisplayLog({ message: `SD.D  ${registerSource.name} stored in M[${effectiveAddress}] is executed`, clockCycle: this.clockCycle });
        }
    }

    executeStations() {
        this.executeAddReservationStations();
        this.executeMulReservationStations();
        this.executeLoadBuffers();
        this.executeStoreBuffers();
    }

    executeAddReservationStations() {
        this.addReservationStations.forEach((station, index) => {
            if (station.busy && station.timeLeft === 0) {
                this.executeInstruction(station);
                const newAddReservationStations=[...this.addReservationStations];
                newAddReservationStations[index] = {
                    name: newAddReservationStations[index].name,
                    busy: false,
                    op: null,
                    Vj: null,
                    Vk: null,
                    Qj: null,
                    Qk: null,
                    A: null,
                    timeLeft: null,
                    registerDestinationIndex:null
                };
                this.setAddReservationStations(newAddReservationStations);
            } else if (station.busy && station.Vj && station.Vk) { // till the 2 operands are filled with the correct value
                const newAddReservationStations=[...this.addReservationStations];
                newAddReservationStations[index].timeLeft!--;
                this.setAddReservationStations(newAddReservationStations);
            }
        });
    }

    executeMulReservationStations() {
        this.mulReservationStations.forEach((station, index) => {
            if (station.busy && station.timeLeft === 0) {
                this.executeInstruction(station);
                const newMulReservationStations=[...this.mulReservationStations];
                newMulReservationStations[index] = {
                    name: newMulReservationStations[index].name,
                    busy: false,
                    op: null,
                    Vj: null,
                    Vk: null,
                    Qj: null,
                    Qk: null,
                    A: null,
                    timeLeft: null,
                    registerDestinationIndex:null
                };
                this.setMulReservationStations(newMulReservationStations);
            } else if (station.busy && station.Vj && station.Vk ) {// till the 2 operands are filled with the correct value
                const newMulReservationStations=[...this.mulReservationStations];
                newMulReservationStations[index].timeLeft!--;
                this.setMulReservationStations(newMulReservationStations);
            }
        });
    }

    executeLoadBuffers() {
        this.loadBuffers.forEach((buffer, index) => {
            // TODO: We need to check here if multiple writes will occur what will occur
            if (buffer.busy && buffer.timeLeft === 0) {
                this.executeInstruction(buffer);
                const newLoadBuffers=[...this.loadBuffers];
                newLoadBuffers[index] = {
                    name:newLoadBuffers[index].name,
                    busy: false,
                    effectiveAddress: null,
                    timeLeft:null,
                    registerDestinationIndex:null,
                    op:null     
                };
                this.setLoadBuffers(this.loadBuffers);
            } else if (buffer.busy && buffer.registerDestinationIndex ) {
                const newLoadBuffers=[...this.loadBuffers];
                newLoadBuffers[index].timeLeft!--;
                this.setLoadBuffers(newLoadBuffers);
            }
        });
    }

    executeStoreBuffers() {
        this.storeBuffers.forEach((buffer, index) => {
            // TODO: We need to check here if multiple writes will occur what will occur
            if (buffer.busy && buffer.timeLeft === 0) {
                this.executeInstruction(buffer);
                const newStoreBuffers=[...this.storeBuffers]
                newStoreBuffers[index] = {
                    name:newStoreBuffers[index].name,
                    effectiveAddress:null,
                    busy:false,
                    value:null,
                    Q:null,
                    timeLeft:null,
                    registerSourceIndex:null,
                    op:null
                };
                this.setStoreBuffers(newStoreBuffers);
            } else if (buffer.busy && buffer.registerSourceIndex) {
                const newStoreBuffers=[...this.storeBuffers];
                newStoreBuffers[index].timeLeft!--;
                this.setStoreBuffers(newStoreBuffers);
            }
        });
    }

        
}




export default Execute;