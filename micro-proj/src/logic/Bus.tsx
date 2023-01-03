import {  ArithmeticReservationStation, logType, latencyType, StoreBuffer, LoadBuffer, Register } from '../common/types';
import {  LoadBuffers, StoreBuffers, printStations } from './Arrays';
import INSTRUCTION from '../common/Instruction.enum'
import { Alert } from 'react-bootstrap';
const instructionSyntaxError = 'Syntax Error Instruction';

class Bus {
    setDisplayLog: (log: logType) => void;
    clockCycle: number;
    latency: latencyType;
    setRegisterFile: (registerFile: Register[]) => void;
    setAddReservationStations: (addReservationStations: ArithmeticReservationStation[] ) => void;
    setMulReservationStations: (mulReservationStations: ArithmeticReservationStation[]) => void;
    setLoadBuffers: (loadBuffers: typeof LoadBuffers) => void;
    setStoreBuffers: (storeBuffers: typeof StoreBuffers) => void;
    setMemoryArray: (memoryArray: number[]) => void;
    registerFile: Register[];
    addReservationStations: ArithmeticReservationStation [];
    mulReservationStations: ArithmeticReservationStation [];
    loadBuffers: typeof LoadBuffers;
    storeBuffers: typeof StoreBuffers;
    memoryArray: number[]

    constructor(
        setDisplayLog: (log: logType) => void,
        clockCycle: number,
        latency: latencyType,
        setRegisterFile: (registerFile: Register[]) => void,
        setAddReservationStations: (addReservationStations: ArithmeticReservationStation[]) => void,
        setMulReservationStations: (mulReservationStations: ArithmeticReservationStation[]) => void,
        setLoadBuffers: (loadBuffers: typeof LoadBuffers) => void,
        setStoreBuffers: (storeBuffers: typeof StoreBuffers) => void,
        setMemoryArray: (memoryArray: number[]) => void,
        registerFile: Register[],
        addReservationStations: ArithmeticReservationStation[],
        mulReservationStations: ArithmeticReservationStation[],
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

    async broadcast() {

        let writeStation:ArithmeticReservationStation | LoadBuffer=null;
        let fifoIndex=0;
        let reservationStationType:string;
        let reservationIndex:number;

        this.addReservationStations.forEach((station,index) => {
           // alert(station.registerDestinationValue)
            if (station.timeLeft === 0 && station.registerDestinationValue !== null) {
                if(station.instructionIndex > fifoIndex){ // instruction index
                    fifoIndex=station.instructionIndex;
                    writeStation=station;
                    reservationStationType='Add';
                    reservationIndex=index;
                }

                
            }
        }
        );
        this.mulReservationStations.forEach((station,index) => {
            if (station.timeLeft === 0 && station.registerDestinationValue!==null) {
                if(station.instructionIndex > fifoIndex){ // instruction index
                    fifoIndex=station.instructionIndex;
                    writeStation=station;
                    reservationStationType='Mul';
                    reservationIndex=index;


                }
            }
        });

        this.loadBuffers.forEach((station,index) => {
            if (station.timeLeft === 0 && station.registerDestinationValue!==null) {
                if(station.instructionIndex > fifoIndex){ // instruction index
                    fifoIndex=station.instructionIndex;
                    writeStation=station;
                    reservationStationType='Load';
                    reservationIndex=index;
                }
            }
        });

      await  this.writeBack(writeStation,reservationStationType,reservationIndex);
      await  this.writeStoreBuffer();
    }

    async writeStoreBuffer(){

        let fifoIndex=0;
        let bufferIndex:number;
        let writeStation:StoreBuffer=null;

        this.storeBuffers.forEach((station,index) => {
                if (station.timeLeft === 0 && station.registerDestinationValue) {
                    if(station.instructionIndex > fifoIndex){ // instruction index
                        fifoIndex=station.instructionIndex;
                        writeStation=station;
                        bufferIndex=index;
                    }
            }
        });

        if (writeStation) // a store instruction wants to write back
        {
            // empty store buffer
            this.storeBuffers[bufferIndex] = {
                ...this.storeBuffers[bufferIndex],
                busy: false,
                effectiveAddress: null,
                timeLeft:null,
                op:null,
                registerDestinationValue:null,
                instructionIndex:null
            };
           await this.setStoreBuffers(this.storeBuffers);
       
            // write to memory
            this.memoryArray[writeStation.effectiveAddress] = writeStation.registerDestinationValue;
          await  this.setMemoryArray(this.memoryArray);
           await this.setDisplayLog({message:`Memory ${writeStation.effectiveAddress} is written with value ${writeStation.registerDestinationValue} at clock cycle ${this.clockCycle}`,clockCycle:this.clockCycle});
            }
    }


   async writeBack(writeStation:ArithmeticReservationStation | LoadBuffer,reservationStationType:string,reservationIndex:number) {
        if(writeStation!==null){
            if(this.registerFile[writeStation.registerDestinationIndex].reservationStageName === writeStation.name ){
                this.registerFile[writeStation.registerDestinationIndex].value = writeStation.registerDestinationValue;
                this.registerFile[writeStation.registerDestinationIndex].reservationStageName = null;
            await this.setRegisterFile(this.registerFile);
            await this.setDisplayLog({message:`Register ${writeStation.registerDestinationIndex} is written with value ${writeStation.registerDestinationValue} at clock cycle ${this.clockCycle}`,clockCycle:this.clockCycle});   
            }

            

            // supply value to the reservation stations
            await this.addReservationStations.forEach(async(station,index) => {
                if(station.Qj === writeStation.name){
                    this.addReservationStations[index] = {
                        ...this.addReservationStations[index],
                        Qj: null,
                        Vj: writeStation.registerDestinationValue
                    };
                 await   this.setAddReservationStations(this.addReservationStations);

                }
                if(station.Qk === writeStation.name){
                    this.addReservationStations[index] = {
                        ...this.addReservationStations[index],
                        Qk: null,
                        Vk: writeStation.registerDestinationValue
                    };
                 await this.setAddReservationStations(this.addReservationStations);
                }
            });

            await this.mulReservationStations.forEach(async(station,index) => {
                if(station.Qj === writeStation.name){
                    this.mulReservationStations[index] = {
                        ...this.mulReservationStations[index],
                        Qj: null,
                        Vj: writeStation.registerDestinationValue
                    };
                  await  this.setMulReservationStations(this.mulReservationStations);
                }
                if(station.Qk === writeStation.name){
                    this.mulReservationStations[index] = {
                        ...this.mulReservationStations[index],
                        Qk: null,
                        Vk: writeStation.registerDestinationValue
                    };
                 await   this.setMulReservationStations(this.mulReservationStations);
                }
            });

            this.storeBuffers.forEach(async(station,index) => {
                if(station.Q== writeStation.name){
                    this.storeBuffers[index] = {
                        ...this.storeBuffers[index],
                        Q: null,
                        V: writeStation.registerDestinationValue
                    };
                 await   this.setStoreBuffers(this.storeBuffers);
                }
            });


            


            
            // emptying the according reservation station
            if(reservationStationType==='Add'){
                this.addReservationStations[reservationIndex] = {
                    ...this.addReservationStations[reservationIndex],
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
                    instructionIndex:null

                };
                await this.setAddReservationStations(this.addReservationStations);
            }
            else if(reservationStationType==='Mul'){
                this.mulReservationStations[reservationIndex] = {
                    ...this.mulReservationStations[reservationIndex],
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
                    instructionIndex:null
                };
              await  this.setMulReservationStations(this.mulReservationStations);
            }
            else if(reservationStationType==='Load'){
                this.loadBuffers[reservationIndex] = {
                    ...this.loadBuffers[reservationIndex],
                    busy: false,
                    effectiveAddress: null,
                    timeLeft:null,
                    registerDestinationIndex:null,
                    op:null,
                    registerDestinationValue:null,
                    instructionIndex:null
                };
               await this.setLoadBuffers(this.loadBuffers);
            }
        
        
    }
}



}


export default Bus;