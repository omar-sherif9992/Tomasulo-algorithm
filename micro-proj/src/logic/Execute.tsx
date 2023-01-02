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
   
 

    executeInstruction(instruction: ArithmeticReservationStation | LoadBuffer | StoreBuffer):number {
        switch (instruction.op) {
            case INSTRUCTION.ADD:
               return this.executeAdd(instruction as ArithmeticReservationStation);
            case INSTRUCTION.SUB:
               return this.executeSub(instruction as ArithmeticReservationStation);
                ;
            case INSTRUCTION.MUL:
               return this.executeMul(instruction as ArithmeticReservationStation);
            case INSTRUCTION.DIV:
               return this.executeDiv(instruction as ArithmeticReservationStation);
                
            case INSTRUCTION.LD:
               return this.executeLoad(instruction as LoadBuffer);
                
            case INSTRUCTION.SD:
               return this.executeStore(instruction as StoreBuffer);
               
            default:
                this.setDisplayLog({ message: instructionSyntaxError, clockCycle: this.clockCycle });
                break;
        }
    
    }

 

    executeAdd(instruction: ArithmeticReservationStation):number {
        const {  registerDestinationIndex,Vk, Vj } = instruction;
        if(registerDestinationIndex && Vj && Vk){
        const source1Value = Vj;
        const source2Value = Vk;
        const result = source1Value + source2Value;
  /*       this.registerFile[registerDestinationIndex].value = result;
        this.setRegisterFile(this.registerFile); */
        this.setDisplayLog({ message: `ADD.D F${registerDestinationIndex}=${source1Value} +${source2Value}`, clockCycle: this.clockCycle });
        return result;
    }
    }

    executeSub(instruction: ArithmeticReservationStation):number {
        const {  registerDestinationIndex,Vk, Vj } = instruction;
        if(registerDestinationIndex && Vj && Vk){
        const source1Value = Vj;
        const source2Value = Vk;
        const result = source1Value - source2Value;
     /*    this.registerFile[registerDestinationIndex].value = result;
        this.setRegisterFile(this.registerFile); */
        this.setDisplayLog({ message: `SUB.D F${registerDestinationIndex}=${source1Value}-${source2Value}`, clockCycle: this.clockCycle });
        return result;
    }
    }

    executeMul(instruction: ArithmeticReservationStation) {
        const {  registerDestinationIndex,Vk, Vj } = instruction;
        if(registerDestinationIndex && Vj && Vk){
        const source1Value = Vj;
        const source2Value = Vk;
        const result = source1Value * source2Value;
   /*      const newRegisterFile = [...this.registerFile];
        newRegisterFile[registerDestinationIndex].value = result;
        this.setRegisterFile(newRegisterFile); */
        this.setDisplayLog({ message: `MUL.D F${registerDestinationIndex}=${Vj}*${Vk}`, clockCycle: this.clockCycle });
        return result;
        }
    }

    executeDiv(instruction: ArithmeticReservationStation) {
        const { registerDestinationIndex, Vj, Vk } = instruction;
        if(registerDestinationIndex && Vj && Vk){
        const source1Value = Vj;
        const source2Value = Vk;
        const result = source1Value / source2Value;
/*         const newRegisterFile = [...this.registerFile];
        newRegisterFile[registerDestinationIndex].value = result;
        this.setRegisterFile(newRegisterFile); */
        this.setDisplayLog({ message: `DIV.D F${registerDestinationIndex}=${Vj}/${Vk}`, clockCycle: this.clockCycle });
        return result;
        }
    }

    executeLoad(instruction: LoadBuffer) {
        const { effectiveAddress, registerDestinationIndex } = instruction;
        if(effectiveAddress && registerDestinationIndex){
        const memoryValue = this.memoryArray[effectiveAddress];

    /*     const newRegisterFile = [...this.registerFile];
        newRegisterFile[registerDestinationIndex].value = memoryValue;
        this.setRegisterFile(newRegisterFile); */
        this.setDisplayLog({ message: `LD.D F${registerDestinationIndex} from  M[${effectiveAddress}]`, clockCycle: this.clockCycle });

        return memoryValue;
        }
    }

    executeStore(instruction: StoreBuffer) {
        const { effectiveAddress, registerSourceIndex } = instruction;
        if(registerSourceIndex && effectiveAddress){
        const registerSource = this.registerFile[registerSourceIndex];
    /*     const newMemory=[...this.memoryArray];
        newMemory[effectiveAddress] = registerSource.value;
        this.setMemoryArray(newMemory); */
        this.setDisplayLog({ message: `SD.D  ${registerSource.name} stored in M[${effectiveAddress}] is executed`, clockCycle: this.clockCycle });
        return  registerSource.value;
    }
    }

    executeStations() { // execute all stations
        this.executeAddReservationStations();
        this.executeMulReservationStations();
        this.executeLoadBuffers();
        this.executeStoreBuffers();
    }

    executeAddReservationStations() {
        this.addReservationStations.forEach((station, index) => {
            
            if (station.busy && station.timeLeft === 1) { // if station is busy and last cycle for it we execute and save the result to writeback when FIFO
               const registerDestinationValue=  this.executeInstruction(station); // value expected to be written in the write back
     
                // deep cloning for react state
                const newAddReservationStations=[...this.addReservationStations];
                newAddReservationStations[index] = {
               ...newAddReservationStations[index],
                    registerDestinationValue,
                    timeLeft:station.timeLeft-- // decrement to write back at next cycle
                };
                this.setAddReservationStations(newAddReservationStations); 

            } else if (station.busy && station.Vj && station.Vk && station.timeLeft >1 ) { // till the 2 operands are filled with the correct value
                const newAddReservationStations=[...this.addReservationStations];
                newAddReservationStations[index].timeLeft!--;
                this.setAddReservationStations(newAddReservationStations);
            }
        });
    }

    executeMulReservationStations() {
        this.mulReservationStations.forEach((station, index) => {
            if (station.busy && station.timeLeft === 1) {
                const registerDestinationValue=this.executeInstruction(station);
                const newMulReservationStations=[...this.mulReservationStations];
                newMulReservationStations[index] = {
                    ...newMulReservationStations[index],
                    registerDestinationValue,
                    timeLeft:station.timeLeft-- // decrement to write back at next cycle
                };
                this.setMulReservationStations(newMulReservationStations);
            } else if (station.busy && station.Vj && station.Vk && station.timeLeft >1 ) {// till the 2 operands are filled with the correct value
                const newMulReservationStations=[...this.mulReservationStations];
                newMulReservationStations[index].timeLeft!--;
                this.setMulReservationStations(newMulReservationStations);
            }
        });
    }

    executeLoadBuffers() {
        this.loadBuffers.forEach((buffer, index) => {
            // TODO: We need to check here if multiple writes will occur what will occur
            if (buffer.busy && buffer.timeLeft === 1) {
              const  registerDestinationValue =this.executeInstruction(buffer);
                const newLoadBuffers=[...this.loadBuffers];
                newLoadBuffers[index] = {
                    ...newLoadBuffers[index],
                    registerDestinationValue,
                    timeLeft:buffer.timeLeft-- // decrement to write back at next cycle

                };
                this.setLoadBuffers(this.loadBuffers);
            } else if (buffer.busy && buffer.registerDestinationIndex && buffer.timeLeft >1) {
                const newLoadBuffers=[...this.loadBuffers];
                newLoadBuffers[index].timeLeft!--;
                this.setLoadBuffers(newLoadBuffers);
            }
        });
    }

    executeStoreBuffers() {
        this.storeBuffers.forEach((buffer, index) => {
            // TODO: We need to check here if multiple writes will occur what will occur
            if (buffer.busy && buffer.timeLeft === 1) {
            const registerDestinationValue=    this.executeInstruction(buffer);
                const newStoreBuffers=[...this.storeBuffers]
                newStoreBuffers[index] = {
                    ...newStoreBuffers[index],
                    registerDestinationValue,
                    timeLeft:buffer.timeLeft-- // decrement to write back at next cycle
                };

                this.setStoreBuffers(newStoreBuffers);
            } else if (buffer.busy && buffer.registerSourceIndex && buffer.timeLeft >1) {
                const newStoreBuffers=[...this.storeBuffers];
                newStoreBuffers[index].timeLeft--;
                this.setStoreBuffers(newStoreBuffers);
            }
        });
    }

        
}




export default Execute;