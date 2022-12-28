import Parser from './Parser'
import Issuer from './Issuer';
import { latencyType, logType, QueueType } from '../common/types';
import { RegisterFile, AddReservationStations, MulReservationStations, LoadBuffers, StoreBuffers } from './Arrays';
import STATUS from '../common/Status.enum';



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
status,
setStatus
) {
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
const parser = new Parser(setDisplayLog,clockCycle);
    
if(instructionQueue.length()>0 && STATUS.ACTIVE){
    let currentInstruction: string = instructionQueue.peek();
    setCurrentInstruction(currentInstruction);
    currentInstruction = instructionQueue.dequeue();
    setCurrentInstruction(currentInstruction);
    console.log('currentInstruction');
    console.log(currentInstruction);
    const parsedInstruction = parser.parse(currentInstruction);
    console.log('parsedInstruction');
    console.log(parsedInstruction);
    issuer.put(parsedInstruction);
}
else{
    setStatus(STATUS.EMPTY);
    setCurrentInstruction('');
}

}


export default main;