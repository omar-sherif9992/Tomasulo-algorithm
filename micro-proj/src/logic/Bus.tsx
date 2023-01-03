import {  ArithmeticReservationStation, logType, latencyType, StoreBuffer, LoadBuffer, Register } from '../common/types';
import INSTRUCTION from '../common/Instruction.enum'
import { Alert } from 'react-bootstrap';
const instructionSyntaxError = 'Syntax Error Instruction';

class Bus {
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
        if(writeStation === null) return;    


        if (writeStation) // a store instruction wants to write back
        {
            const targetStoreBuffer=Object.assign({},  this.storeBuffers[bufferIndex]);

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
           await this.setStoreBuffers(this.storeBuffers,targetStoreBuffer.instructionString,targetStoreBuffer.timeLeft,targetStoreBuffer.instructionIndex,null,null,null,this.clockCycle);
       
            // write to memory
            /* this.memoryArray[writeStation.effectiveAddress] = writeStation.registerDestinationValue;
            await this.setMemoryArray(this.memoryArray,targetStoreBuffer.instructionString,targetStoreBuffer.timeLeft,targetStoreBuffer.instructionIndex,null,null,null,this.clockCycle);
      */      await this.setDisplayLog({message:`Memory ${writeStation.effectiveAddress} is written with value ${writeStation.registerDestinationValue} at clock cycle ${this.clockCycle}`,clockCycle:this.clockCycle});
            }
    }


   async writeBack(writeStation:ArithmeticReservationStation | LoadBuffer,reservationStationType:string,reservationIndex:number) {
    if(writeStation === null) return;    
    
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
                    const targetAddReservationStations=this.addReservationStations[index];

                 await   this.setAddReservationStations(this.addReservationStations,targetAddReservationStations.instructionString,targetAddReservationStations.timeLeft,targetAddReservationStations.instructionIndex,null,null,null,null);

                }
                if(station.Qk === writeStation.name){
                    this.addReservationStations[index] = {
                        ...this.addReservationStations[index],
                        Qk: null,
                        Vk: writeStation.registerDestinationValue
                    };
                    const targetAddReservationStations=this.addReservationStations[index];

                    await   this.setAddReservationStations(this.addReservationStations,targetAddReservationStations.instructionString,targetAddReservationStations.timeLeft,targetAddReservationStations.instructionIndex,null,null,null,null);
                }
            });

            await this.mulReservationStations.forEach(async(station,index) => {
                if(station.Qj === writeStation.name){
                    this.mulReservationStations[index] = {
                        ...this.mulReservationStations[index],
                        Qj: null,
                        Vj: writeStation.registerDestinationValue
                    };
                    const targetMulReservationStations=this.mulReservationStations[index];

                    await   this.setMulReservationStations(this.mulReservationStations,targetMulReservationStations.instructionString,targetMulReservationStations.timeLeft,targetMulReservationStations.instructionIndex,null,null,null,null);

                }
                if(station.Qk === writeStation.name){
                    this.mulReservationStations[index] = {
                        ...this.mulReservationStations[index],
                        Qk: null,
                        Vk: writeStation.registerDestinationValue
                    };
                    const targetMulReservationStations=this.mulReservationStations[index];

                    await   this.setMulReservationStations(this.mulReservationStations,targetMulReservationStations.instructionString,targetMulReservationStations.timeLeft,targetMulReservationStations.instructionIndex,null,null,null,null);
                }
            });

            this.storeBuffers.forEach(async(station,index) => {
                if(station.Q== writeStation.name){
                    this.storeBuffers[index] = {
                        ...this.storeBuffers[index],
                        Q: null,
                        V: writeStation.registerDestinationValue
                    };

                    const targetStoreBuffers=this.storeBuffers[index];

                    await   this.setStoreBuffers(this.storeBuffers,targetStoreBuffers.instructionString,targetStoreBuffers.timeLeft,targetStoreBuffers.instructionIndex,null,null,null,null);
                }
            });


            


            
            // emptying the according reservation station
            if(reservationStationType==='Add'){

                const targetAddReservationStations=Object.assign({},  this.addReservationStations[reservationIndex]);

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
                


                await   this.setAddReservationStations(this.addReservationStations,targetAddReservationStations.instructionString,null,targetAddReservationStations.instructionIndex,null,null,null,this.clockCycle);
           }
            else if(reservationStationType==='Mul'){
                const targetMulReservationStations=Object.assign({},  this.mulReservationStations[reservationIndex]);

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

                await   this.setMulReservationStations(this.mulReservationStations,targetMulReservationStations.instructionString,null,targetMulReservationStations.instructionIndex,null,null,null,this.clockCycle);

            }
            else if(reservationStationType==='Load'){
                console.log('load buffer null')
                console.log(this.loadBuffers[reservationIndex]);
                const targetLoadBuffers=Object.assign({},  this.loadBuffers[reservationIndex]);

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


                await   this.setLoadBuffers(this.loadBuffers,targetLoadBuffers.instructionString,null,targetLoadBuffers.instructionIndex,null,null,null,this.clockCycle);
            }
        
        
    }
}



}


export default Bus;