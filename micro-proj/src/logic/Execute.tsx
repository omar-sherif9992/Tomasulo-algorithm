import {  ArithmeticReservationStation, logType, latencyType, StoreBuffer, LoadBuffer, Register } from '../common/types';
import { RegisterFile, AddReservationStations, MulReservationStations, LoadBuffers, StoreBuffers, printStations } from './Arrays';
import INSTRUCTION from '../common/Instruction.enum'
const instructionSyntaxError = 'Syntax Error Instruction';

class Execute {
    setDisplayLog: (log: logType) => void;
    clockCycle: number;
    latency: latencyType;
    setRegisterFile:(registerFile: Register[])=>void;
    setAddReservationStations:(addReservationStations:ArithmeticReservationStation[],timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void;
    setMulReservationStations:(mulReservationStations:ArithmeticReservationStation[],timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void;
    setLoadBuffers:(loadBuffers: LoadBuffer[],timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void;
    setStoreBuffers:(storeBuffers:StoreBuffer[],timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void;
    setMemoryArray:(memoryArray:number[],timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void;
    registerFile:Register[];
    addReservationStations:ArithmeticReservationStation[];
    mulReservationStations:ArithmeticReservationStation[];
    loadBuffers:LoadBuffer[];
    storeBuffers: StoreBuffer[];
    memoryArray:number[];
    

    constructor(
        setDisplayLog: (log: logType) => void,
        clockCycle: number,
        latency: latencyType,
        setRegisterFile:(registerFile: Register[])=>void,
        setAddReservationStations:(addReservationStations:ArithmeticReservationStation[],timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void,
        setMulReservationStations:(mulReservationStations:ArithmeticReservationStation[],timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void,
        setLoadBuffers:(loadBuffers: LoadBuffer[],timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void,
        setStoreBuffers:(storeBuffers:StoreBuffer[],timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void,
        setMemoryArray:(memoryArray:number[],timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void,
        registerFile:Register[],
        addReservationStations:ArithmeticReservationStation[],
        mulReservationStations:ArithmeticReservationStation[],
        loadBuffers:LoadBuffer[],
        storeBuffers: StoreBuffer[],
        memoryArray:number[],
        
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
   
 

   async executeInstruction(instruction: ArithmeticReservationStation | LoadBuffer | StoreBuffer):Promise<number> {
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
             await   this.setDisplayLog({ message: instructionSyntaxError, clockCycle: this.clockCycle });
                break;
        }
    
    }

 

   async executeAdd(instruction: ArithmeticReservationStation):Promise<number> {
        const {  registerDestinationIndex,Vk, Vj } = instruction;
        if(registerDestinationIndex && Vj && Vk){
        const source1Value = Vj;
        const source2Value = Vk;
        const result = source1Value + source2Value;
  /*       this.registerFile[registerDestinationIndex].value = result;
        this.setRegisterFile(this.registerFile); */
    await    this.setDisplayLog({ message: `ADD.D F${registerDestinationIndex}=${source1Value} +${source2Value}`, clockCycle: this.clockCycle });
        return result;
    }
    }

  async  executeSub(instruction: ArithmeticReservationStation):Promise<number> {
        const {  registerDestinationIndex,Vk, Vj } = instruction;
        if(registerDestinationIndex && Vj && Vk){
        const source1Value = Vj;
        const source2Value = Vk;
        const result = source1Value - source2Value;
     /*    this.registerFile[registerDestinationIndex].value = result;
        this.setRegisterFile(this.registerFile); */
   await     this.setDisplayLog({ message: `SUB.D F${registerDestinationIndex}=${source1Value}-${source2Value}`, clockCycle: this.clockCycle });
        return result;
    }
    }

  async  executeMul(instruction: ArithmeticReservationStation) {
        const {  registerDestinationIndex,Vk, Vj } = instruction;
        if(registerDestinationIndex && Vj && Vk){
        const source1Value = Vj;
        const source2Value = Vk;
        const result = source1Value * source2Value;
   /*      const newRegisterFile = [...this.registerFile];
        newRegisterFile[registerDestinationIndex].value = result;
        this.setRegisterFile(newRegisterFile); */
   await     this.setDisplayLog({ message: `MUL.D F${registerDestinationIndex}=${Vj}*${Vk}`, clockCycle: this.clockCycle });
        return result;
        }
    }

  async  executeDiv(instruction: ArithmeticReservationStation) {
        const { registerDestinationIndex, Vj, Vk } = instruction;
        if(registerDestinationIndex && Vj && Vk){
        const source1Value = Vj;
        const source2Value = Vk;
        const result = source1Value / source2Value;
/*         const newRegisterFile = [...this.registerFile];
        newRegisterFile[registerDestinationIndex].value = result;
        this.setRegisterFile(newRegisterFile); */
   await     this.setDisplayLog({ message: `DIV.D F${registerDestinationIndex}=${Vj}/${Vk}`, clockCycle: this.clockCycle });
        return result;
        }
    }

    async executeLoad(instruction: LoadBuffer) {
        const { effectiveAddress, registerDestinationIndex } = instruction;
        if(effectiveAddress && registerDestinationIndex){
        const memoryValue = this.memoryArray[effectiveAddress];

    /*     const newRegisterFile = [...this.registerFile];
        newRegisterFile[registerDestinationIndex].value = memoryValue;
        this.setRegisterFile(newRegisterFile); */
     await   this.setDisplayLog({ message: `LD.D F${registerDestinationIndex} from  M[${effectiveAddress}]`, clockCycle: this.clockCycle });

        return memoryValue;
        }
    }

   async executeStore(instruction: StoreBuffer) {
        const { effectiveAddress, registerSourceIndex } = instruction;
        if(registerSourceIndex && effectiveAddress){
        const registerSource = this.registerFile[registerSourceIndex];
    /*     const newMemory=[...this.memoryArray];
        newMemory[effectiveAddress] = registerSource.value;
        this.setMemoryArray(newMemory); */
      await  this.setDisplayLog({ message: `SD.D  ${registerSource.name} stored in M[${effectiveAddress}] is executed`, clockCycle: this.clockCycle });
        return  registerSource.value;
    }
    }

   async executeStations() { // execute all stations
        await this.executeAddReservationStations();
        await this.executeMulReservationStations();
        await this.executeLoadBuffers();
        await this.executeStoreBuffers();
    }

   async executeAddReservationStations() {
        await this.addReservationStations.forEach(async (station, index) => {
            
            if (station.busy && station.timeLeft === 1) { // if station is busy and last cycle for it we execute and save the result to writeback when FIFO
               const registerDestinationValue=  await this.executeInstruction(station); // value expected to be written in the write back
                console.log('registerDestinationValue');
                console.log(registerDestinationValue);
                // deep cloning for react state
                this.addReservationStations[index] = {
               ...this.addReservationStations[index],
                    registerDestinationValue,
                    timeLeft:0 // decrement to write back at next cycle
                };
              await  this.setAddReservationStations(this.addReservationStations,this.addReservationStations[index].timeLeft,this.addReservationStations[index].instructionIndex,null,null,this.clockCycle,null); 

            } else if (station.busy && station.Vj && station.Vk && station.timeLeft >1 ) { // till the 2 operands are filled with the correct value
                this.addReservationStations[index].timeLeft!--;
                await  this.setAddReservationStations(this.addReservationStations,this.addReservationStations[index].timeLeft,this.addReservationStations[index].instructionIndex,null,this.clockCycle,null,null); 
            }
        });
    }

   async executeMulReservationStations() {
       await this.mulReservationStations.forEach(async(station, index) => {
            if (station.busy && station.timeLeft === 1) {
                const registerDestinationValue=await this.executeInstruction(station);
                this.mulReservationStations[index] = {
                    ...this.mulReservationStations[index],
                    registerDestinationValue,
                    timeLeft:0 // decrement to write back at next cycle
                };

                await  this.setMulReservationStations(this.mulReservationStations,this.mulReservationStations[index].timeLeft,this.mulReservationStations[index].instructionIndex,null,null,this.clockCycle,null); 

            } else if (station.busy && station.Vj && station.Vk && station.timeLeft >1 ) {// till the 2 operands are filled with the correct value
                this.mulReservationStations[index].timeLeft!--;
                await  this.setMulReservationStations(this.mulReservationStations,this.mulReservationStations[index].timeLeft,this.mulReservationStations[index].instructionIndex,null,this.clockCycle,null,null); 
            }
        });
    }

    async executeLoadBuffers() {
       await this.loadBuffers.forEach(async(buffer, index) => {
            // TODO: We need to check here if multiple writes will occur what will occur
            if (buffer.busy && buffer.timeLeft === 1) {
              const  registerDestinationValue =await this.executeInstruction(buffer);
                this.loadBuffers[index] = {
                    ...this.loadBuffers[index],
                    registerDestinationValue,
                    timeLeft:0 // decrement to write back at next cycle

                };
                await  this.setLoadBuffers(this.loadBuffers,this.loadBuffers[index].timeLeft,this.loadBuffers[index].instructionIndex,null,null,this.clockCycle,null); 

            } else if (buffer.busy && buffer.registerDestinationIndex && buffer.timeLeft >1) {
                this.loadBuffers[index].timeLeft!--;
                await  this.setLoadBuffers(this.loadBuffers,this.loadBuffers[index].timeLeft,this.loadBuffers[index].instructionIndex,null,this.clockCycle,null,null); 

            }
        });
    }

   async executeStoreBuffers() {
        this.storeBuffers.forEach(async(buffer, index) => {
            // TODO: We need to check here if multiple writes will occur what will occur
            if (buffer.busy && buffer.timeLeft === 1) {
            const registerDestinationValue= await   this.executeInstruction(buffer);
            this.storeBuffers[index] = {
                    ...this.storeBuffers[index],
                    registerDestinationValue,
                    timeLeft:0 // decrement to write back at next cycle
                };
                await  this.setStoreBuffers(this.storeBuffers,this.storeBuffers[index].timeLeft,this.storeBuffers[index].instructionIndex,null,null,this.clockCycle,null); 

            } else if (buffer.busy && buffer.registerSourceIndex && buffer.timeLeft >1) {
                this.storeBuffers[index].timeLeft--;
                await  this.setStoreBuffers(this.storeBuffers,this.storeBuffers[index].timeLeft,this.storeBuffers[index].instructionIndex,null,this.clockCycle,null,null); 

            }
        });
    }

        
}




export default Execute;