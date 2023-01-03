import { ArithmeticInstruction, MemoryInstruction, ArithmeticReservationStation, logType, latencyType, LoadBuffer, Register, StoreBuffer } from '../common/types';
import { printStations } from './Arrays';
import INSTRUCTION from '../common/Instruction.enum'
import { Alert } from 'react-bootstrap';
const instructionSyntaxError = 'Syntax Error Instruction';

class Issuer {
    setDisplayLog: (log: logType) => void;
    clockCycle: number;
    latency: latencyType;
    setRegisterFile:(registerFile: Register[])=>void;
    setAddReservationStations:(addReservationStations:ArithmeticReservationStation[],instruction:(string|null),timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void;
    setMulReservationStations:(mulReservationStations:ArithmeticReservationStation[],instruction:(string|null),timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void;
    setLoadBuffers:(loadBuffers: LoadBuffer[],instruction:(string|null),timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void;
    setStoreBuffers:(storeBuffers:StoreBuffer[],instruction:(string|null),timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void;
    setMemoryArray:(memoryArray:number[],instruction:(string|null),timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void;
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
        setAddReservationStations:(addReservationStations:ArithmeticReservationStation[],instruction:(string|null),timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void,
        setMulReservationStations:(mulReservationStations:ArithmeticReservationStation[],instruction:(string|null),timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void,
        setLoadBuffers:(loadBuffers: LoadBuffer[],instruction:(string|null),timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void,
        setStoreBuffers:(storeBuffers:StoreBuffer[],instruction:(string|null),timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void,
        setMemoryArray:(memoryArray:number[],instruction:(string|null),timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null))=>void,
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
    // if false meaning you need to stall instruction queue and not dequeue
    async put(instruction: ArithmeticInstruction | MemoryInstruction): Promise<boolean> {
        let stallFlag: boolean;
        if (instruction.operation === INSTRUCTION.SD || instruction.operation === INSTRUCTION.LD) {
            stallFlag = await this.issueMemoryInstruction(instruction as MemoryInstruction);
        } else if (instruction.operation === INSTRUCTION.ADD || instruction.operation === INSTRUCTION.SUB || instruction.operation === INSTRUCTION.MUL || instruction.operation === INSTRUCTION.DIV) {
            stallFlag = await this.issueArithmeticInstruction(instruction as ArithmeticInstruction);
        }
        else {
            throw new Error(instructionSyntaxError);
        }
        printStations();
        // if !stallFlag true then we need to stall instruction queue dequeuing otherwise execute 
        return !stallFlag;
    }

   async issueArithmeticInstruction(instruction: ArithmeticInstruction): Promise<boolean> {
        let ReservationStation: ArithmeticReservationStation[];
        let typeStation:string;
        // to know which reservation station to go for
        if (instruction.operation === INSTRUCTION.ADD || instruction.operation === INSTRUCTION.SUB) {
            ReservationStation = this.addReservationStations;
            typeStation = 'Add';
         await   this.setDisplayLog({ message: 'checking Add reservation stations for unbusy station', clockCycle: this.clockCycle });
        }
        else if (instruction.operation === INSTRUCTION.MUL || instruction.operation === INSTRUCTION.DIV) {
            ReservationStation = this.mulReservationStations;
            typeStation = 'Mul';
           await this.setDisplayLog({ message: 'checking Mul reservation stations for unbusy station', clockCycle: this.clockCycle })
        }
        for (let stationSlot = 0; stationSlot < ReservationStation.length; stationSlot++) {
            console.log(stationSlot);
            if (!ReservationStation[stationSlot].busy) { // finding the first unbusy slot

                ReservationStation[stationSlot] = {
                    name: ReservationStation[stationSlot].name, // the name of reservation station normally
                    busy: true,
                    op: instruction.operation,
                    Vj: this.registerFile[instruction.source1Index].reservationStageName ? null : this.registerFile[instruction.source1Index].value, // if the found register is reserved by reservation station then the value is null otherwise the value of the register
                    Vk: this.registerFile[instruction.source2Index].reservationStageName ? null : this.registerFile[instruction.source2Index].value,// if the found register is reserved by reservation station then the value is null otherwise the value of the register
                    Qj: this.registerFile[instruction.source1Index].reservationStageName ? this.registerFile[instruction.source1Index].reservationStageName : null,// if the found register is reserved by reservation station then the name of the reservation station otherwise null
                    Qk: this.registerFile[instruction.source2Index].reservationStageName ? this.registerFile[instruction.source2Index].reservationStageName : null,// if the found register is reserved by reservation station then the name of the reservation station otherwise null
                    A: 0,
                    timeLeft: this.latency[instruction.operation]+1,
                    registerDestinationIndex: instruction.destinationIndex,
                    registerDestinationValue: null,
                    instructionIndex:instruction.instructionIndex,
                    instructionString:instruction.instructionString,
                };
      

                if (typeStation === 'Add') {
                  await  this.setAddReservationStations(ReservationStation,instruction.instructionString,this.latency[instruction.operation],instruction.instructionIndex,this.clockCycle,null,null,null);
                }
                else if (typeStation === 'Mul') {
                  await  this.setMulReservationStations(ReservationStation,instruction.instructionString,this.latency[instruction.operation],instruction.instructionIndex,this.clockCycle,null,null,null);
                }

                // deep cloning for react state
                // to know which register is reserved by which reservation station tom make it stall
                this.registerFile[instruction.destinationIndex] = {
                    ...this.registerFile[instruction.destinationIndex],
                    reservationStageName: ReservationStation[stationSlot].name
                };
              await  this.setRegisterFile(this.registerFile);
              await  this.setDisplayLog({ message: `issue ${instruction.operation} instruction to ${ReservationStation[stationSlot].name} station Un-Busy `, clockCycle: this.clockCycle })
                return true;
            }
        }
      await  this.setDisplayLog({ message: `unable to issue ${instruction.operation} instruction no ${typeStation} station is Un-Busy `, clockCycle: this.clockCycle })

        return false;
    }



    async issueMemoryInstruction(instruction: MemoryInstruction): Promise<boolean> {
        if (instruction.operation === INSTRUCTION.SD) { 
            for (let stationSlot = 0; stationSlot < this.storeBuffers.length; stationSlot++) {
                // TODO: store and load same address missing
                if (!this.storeBuffers[stationSlot].busy) { // find the first unbusy slot in store buffer
                    this.storeBuffers[stationSlot] = {
                        name: this.storeBuffers[stationSlot].name, 
                        busy: true,
                        effectiveAddress: instruction.effectiveAddress,
                        V: this.registerFile[instruction.registerIndex].reservationStageName ? null : this.registerFile[instruction.registerIndex].value, // if the found register is reserved by reservation station then the value is null otherwise the value of the register
                        Q: this.registerFile[instruction.registerIndex].reservationStageName ? this.registerFile[instruction.registerIndex].reservationStageName : null,
                        timeLeft: this.latency[instruction.operation]+1,
                        registerSourceIndex:instruction.registerIndex,
                        op:INSTRUCTION.SD,
                        registerDestinationValue: null,
                        instructionIndex:instruction.instructionIndex,  
                        instructionString:instruction.instructionString,                      
                    };
                    await  this.setStoreBuffers(this.storeBuffers,instruction.instructionString,this.latency[instruction.operation],instruction.instructionIndex,this.clockCycle,null,null,null);
                   await this.setDisplayLog({ message: `issue ${instruction.operation} instruction to store ${this.storeBuffers[stationSlot].name}  buffer `, clockCycle: this.clockCycle })
                    return true;
                }
            }
            this.setDisplayLog({ message: `unable to issue ${instruction.operation} instruction no store buffer is Un-Busy `, clockCycle: this.clockCycle })
            return false;
        }
        else if ((instruction.operation) === INSTRUCTION.LD) {
            for (let stationSlot = 0; stationSlot < this.loadBuffers.length; stationSlot++) {
                // TODO: store and load same address missing
                if (!this.loadBuffers[stationSlot].busy) { // find the first unbusy slot in load buffer

                    // deep cloning for react state
                    this.loadBuffers[stationSlot] = {
                        name: this.loadBuffers[stationSlot].name,
                        busy: true,
                        effectiveAddress: instruction.effectiveAddress,
                        timeLeft: this.latency[instruction.operation]+1,
                        registerDestinationIndex: instruction.registerIndex,
                        op:INSTRUCTION.LD,
                        registerDestinationValue: null,
                        instructionIndex:instruction.instructionIndex,    
                        instructionString:instruction.instructionString,                      
                    
                    };
                   await this.setLoadBuffers(this.loadBuffers,instruction.instructionString,this.latency[instruction.operation],instruction.instructionIndex,this.clockCycle,null,null,null);

                    // deep cloning for react state
                    // make the according register stall for the this load
                    this.registerFile[instruction.registerIndex] = {
                        ...this.registerFile[instruction.registerIndex],
                        reservationStageName: this.loadBuffers[stationSlot].name,
                    };
                   await this.setRegisterFile(this.registerFile);
                 await   this.setDisplayLog({ message: `issue ${instruction.operation} instruction to load ${this.loadBuffers[stationSlot].name} buffer `, clockCycle: this.clockCycle })
                    return true;
                }
            }
           await this.setDisplayLog({ message: `unable to issue ${instruction.operation} instruction no load buffer is Un-Busy `, clockCycle: this.clockCycle })
            return false;
        }

    }
}




export default Issuer;