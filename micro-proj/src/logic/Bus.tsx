import {  ArithmeticReservationStation, logType, latencyType, StoreBuffer, LoadBuffer } from '../common/types';
import { RegisterFile, AddReservationStations, MulReservationStations, LoadBuffers, StoreBuffers, printStations } from './Arrays';
import INSTRUCTION from '../common/Instruction.enum'
const instructionSyntaxError = 'Syntax Error Instruction';

class Bus {
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

    broadcast() {

        let writeStation:ArithmeticReservationStation | LoadBuffer=null;
        let fifoIndex=0;
        let reservationStationType:string;
        let reservationIndex:number;

        this.addReservationStations.forEach((station,index) => {
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

        this.writeBack(writeStation,reservationStationType,reservationIndex);
        this.writeStoreBuffer();
    }

    writeStoreBuffer(){

        let fifoIndex=0;
        let reservationIndex:number;
        let writeStation:StoreBuffer=null;

        this.storeBuffers.forEach((station,index) => {
                if (station.timeLeft === 0 && station.registerDestinationValue!==null) {
                    if(station.instructionIndex > fifoIndex){ // instruction index
                        fifoIndex=station.instructionIndex;
                        writeStation=station;
                        reservationIndex=index;
                    }
            }
        });



        const newMemoryArray = [...this.memoryArray];
        newMemoryArray[station.effectiveAddress] = station.registerDestinationValue;
        this.setMemoryArray(newMemoryArray);
        this.setDisplayLog({message:`Memory ${station.memoryAddress} is written with value ${station.registerDestinationValue} at clock cycle ${this.clockCycle}`,clockCycle:this.clockCycle});   
        
        // emptying the according reservation station
        const newStoreBuffers = [...this.storeBuffers];
        newStoreBuffers[index] = {
            ...newStoreBuffers[index],
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
            memoryAddress:null

        };
        this.setStoreBuffers(newStoreBuffers);
    }


    writeBack(writeStation:ArithmeticReservationStation | LoadBuffer,reservationStationType:string,reservationIndex:number) {
        if(writeStation!==null){
            if(this.registerFile[writeStation.registerDestinationIndex].reservationStageName === writeStation.name){
            const newRegisterFile =[... this.registerFile];
            newRegisterFile[writeStation.registerDestinationIndex].value = writeStation.registerDestinationValue;
            newRegisterFile[writeStation.registerDestinationIndex].reservationStageName = null;
            this.setRegisterFile(newRegisterFile);
            this.setDisplayLog({message:`Register ${writeStation.registerDestinationIndex} is written with value ${writeStation.registerDestinationValue} at clock cycle ${this.clockCycle}`,clockCycle:this.clockCycle});   
            
            // emptying the according reservation station
            if(reservationStationType==='Add'){
                const newAddReservationStations = [...this.addReservationStations];
                newAddReservationStations[reservationIndex] = {
                    ...newAddReservationStations[reservationIndex],
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
                this.setAddReservationStations(newAddReservationStations);
            }
            else if(reservationStationType==='Mul'){
                const newMulReservationStations = [...this.mulReservationStations];
                newMulReservationStations[reservationIndex] = {
                    ...newMulReservationStations[reservationIndex],
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
                this.setMulReservationStations(newMulReservationStations);
            }
            else if(reservationStationType==='Load'){
                const newLoadBuffers = [...this.loadBuffers];
                newLoadBuffers[reservationIndex] = {
                    ...newLoadBuffers[reservationIndex],
                    busy: false,
                    effectiveAddress: null,
                    timeLeft:null,
                    registerDestinationIndex:null,
                    op:null,
                    registerDestinationValue:null,
                    instructionIndex:null
                };
                this.setLoadBuffers(newLoadBuffers);
            }
        
        }
    }
}



}


export default Bus;