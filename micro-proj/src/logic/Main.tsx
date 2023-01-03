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
status:STATUS,
setStatus:(status:STATUS)=>void,
cycleTable:cycleTableType[],
setCycleTable:(cycleTableType:cycleTableType[])=>void
) {
    //try{
        const parser = new Parser(setDisplayLog,clockCycle);

  

    
        if(instructionQueue.length() > 0 && STATUS.ACTIVE){ /// instruction queue still not empty
            let currentInstruction: string = instructionQueue.peek();
            setCurrentInstruction(currentInstruction);
           // alert(instructionQueue.length());
            const parsedInstruction = parser.parse(currentInstruction,instructionQueue.queue.length);
            // issuing
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
            
            const stallFlag= await issuer.put(parsedInstruction);
            console.log('currentInstruction');
            console.log(currentInstruction);
            console.log('parsedInstruction');
            console.log(parsedInstruction);
            if(!stallFlag){ // means dequeue instruction queue since there where an empty slot in the according station
             await  instructionQueue.dequeue();
            }
        }
        else{
            setStatus(STATUS.EMPTY);
           await setCurrentInstruction('');
        }

        // write back to bus
        const bus = new Bus(setDisplayLog,clockCycle,
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

      await  bus.broadcast(); 
        // execute


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
    ); 
    
   await     executer.executeStations();

  return isAllEmpty(addReservationStations, mulReservationStations, loadBuffers, storeBuffers);

    /* }
    catch(error){
        //alert(error.message);
        console.log(error.message);
        setDisplayLog({message:error.message,clockCycle:clockCycle});
    } */

}




function isAllEmpty(addReservationStations:ArithmeticReservationStation[],mulReservationStations:ArithmeticReservationStation[],loadBuffers:LoadBuffer[],
    storeBuffers: StoreBuffer[],){

    let emptyFlag = true;
    for(let i = 0; i < addReservationStations.length; i++){
        if(addReservationStations[i].busy){
            emptyFlag = false;
            break;
        }
    }
    if(emptyFlag){
        for(let i = 0; i < mulReservationStations.length; i++){
            if(mulReservationStations[i].busy){
                emptyFlag = false;
                break;
            }
        }
    }
    if(emptyFlag){
        for(let i = 0; i < storeBuffers.length; i++){
            if(storeBuffers[i].busy){
                emptyFlag = false;
                break;
            }
        }
    }
    if(emptyFlag){
        for(let i = 0; i < loadBuffers.length; i++){
            if(loadBuffers[i].busy){
                emptyFlag = false;
                break;
            }
        }
    }
    return emptyFlag;

}


export default main;