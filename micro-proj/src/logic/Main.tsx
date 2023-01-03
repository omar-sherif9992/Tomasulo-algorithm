import Parser from './Parser'
import Issuer from './Issuer';
import Execute from './Execute'
import { ArithmeticReservationStation, cycleTableType, latencyType, LoadBuffer, logType, QueueType, Register, StoreBuffer } from '../common/types';
import STATUS from '../common/Status.enum';
import Bus from './Bus'


async function main(
clockCycle: number, 
instructionQueue: QueueType,
latency:latencyType,
setCurrentInstruction:(instruction:string)=>void,
setDisplayLog:(message:logType)=>void,
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
status:STATUS,
setStatus:(status:STATUS)=>void,
cycleTable:cycleTableType[],
setCycleTable:(cycleTableType:cycleTableType[])=>void
) {

    try{
        const parser = new Parser(setDisplayLog,clockCycle);

    const issuer = new Issuer(setDisplayLog,clockCycle,
        latency,
        setRegisterFile,
        setAddReservationStations,
        setMulReservationStations,
        setLoadBuffers,
        setStoreBuffers,
        setMemoryArray,
        registerFile,
        addReservationStations,
        mulReservationStations,
        loadBuffers,
        storeBuffers,
        memoryArray,
        );
        const executer = new Execute(setDisplayLog,clockCycle,
            latency,
            setRegisterFile,
            setAddReservationStations,
            setMulReservationStations,
            setLoadBuffers,
            setStoreBuffers,
            setMemoryArray,
            registerFile,
            addReservationStations,
            mulReservationStations,
            loadBuffers,
            storeBuffers,
            memoryArray,
            ); const bus = new Bus(setDisplayLog,clockCycle,
            latency,
            setRegisterFile,
            setAddReservationStations,
            setMulReservationStations,
            setLoadBuffers,
            setStoreBuffers,
            setMemoryArray,
            registerFile,
            addReservationStations,
            mulReservationStations,
            loadBuffers,
            storeBuffers,
            memoryArray,
            );
    
        if(instructionQueue.length() > 0 && STATUS.ACTIVE){ /// instruction queue still not empty
            let currentInstruction: string = instructionQueue.peek();
            setCurrentInstruction(currentInstruction);
            const parsedInstruction = parser.parse(currentInstruction,instructionQueue.length());
            const stallFlag= await issuer.put(parsedInstruction);
            console.log('currentInstruction');
            console.log(currentInstruction);
            console.log('parsedInstruction');
            console.log(parsedInstruction);
            if(!stallFlag){ // means dequeue instruction queue since there where an empty slot in the according station
             await   instructionQueue.dequeue();
            }
        }
        else{
            setStatus(STATUS.EMPTY);
           await setCurrentInstruction('');
        }

await        bus.broadcast(); 
   await     executer.executeStations();

    }
    catch(error){
        //alert(error.message);
        console.log(error.message);
        setDisplayLog({message:error.message,clockCycle:clockCycle});
    }

}


export default main;