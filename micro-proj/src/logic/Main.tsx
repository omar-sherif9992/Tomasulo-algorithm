import Parser from './Parser'
import Issuer from './Issuer';
import Execute from './Execute'
import { cycleTableType, latencyType, logType, QueueType } from '../common/types';
import { RegisterFile, AddReservationStations, MulReservationStations, LoadBuffers, StoreBuffers } from './Arrays';
import STATUS from '../common/Status.enum';
import Bus from './Bus'


function main(
clockCycle: number, 
instructionQueue: QueueType,
latency:latencyType,
setCurrentInstruction:(instruction:string)=>void,
setDisplayLog:(message:logType)=>void,
setRegisterFile:(registerFile:typeof RegisterFile)=>void,
setAddReservationStations:(addReservationStations:typeof AddReservationStations)=>void,
setMulReservationStations:(mulReservationStations:typeof MulReservationStations)=>void,
setLoadBuffers:(loadBuffers:typeof LoadBuffers)=>void,
setStoreBuffers:(storeBuffers:typeof StoreBuffers)=>void,
setMemoryArray:(memoryArray:number[])=>void,
registerFile:typeof RegisterFile,
addReservationStations:typeof AddReservationStations,
mulReservationStations:typeof MulReservationStations,
loadBuffers:typeof LoadBuffers,
storeBuffers:typeof StoreBuffers,
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
            const stallFlag=issuer.put(parsedInstruction);
            console.log('currentInstruction');
            console.log(currentInstruction);
            console.log('parsedInstruction');
            console.log(parsedInstruction);
            if(!stallFlag){ // means dequeue instruction queue since there where an empty slot in the according station
                instructionQueue.dequeue();
            }
        }
        else{
            setStatus(STATUS.EMPTY);
            setCurrentInstruction('');
        }

        bus.broadcast(); 
        executer.executeStations();

    }
    catch(error){
        alert(error.message);
        console.log(error.message);
        setDisplayLog({message:error.message,clockCycle:clockCycle});
    }

}


export default main;