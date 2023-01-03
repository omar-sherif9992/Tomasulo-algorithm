import React from 'react';
import { useState ,useEffect} from 'react'
import main from './logic/Main';
import Parser from './logic/Parser';
import code from './assembly/input'
import useQueue from './hooks/useQueue';
import { RegisterFile, MulReservationStations, StoreBuffers, LoadBuffers, AddReservationStations, MemoryArray ,printStations} from './logic/Arrays'
import RegisterFileTable from './components/RegisterFileTable';
import MemoryTable from './components/MemoryTable';
import CurrentInstruction from './components/CurrentInstruction';
import InstructionQueueTable from './components/InstructionQueueTable';
import LogTable from './components/LogTable';
import { ArithmeticReservationStation, cycleTableType, latencyType, LoadBuffer, logType, StoreBuffer } from './common/types';
import AddReservationStationsTable from './components/AddReservationStationTable';
import MulReservationStationsTable from './components/MulReservationStationTable';
import LoadBuffersTable from './components/LoadBuffersTable';
import StoreBuffersTable from './components/StoreBuffersTable';
import STATUS from './common/Status.enum';
import Form from './components/Form';
import CycleTable from './components/CycleTable';
import LatenciesTable from './components/LatenciesTable';


const parser = new Parser(()=>{},0);
function App() {

  const [instructionValue,setInstructionsValue]=useState('');
  //const [clockCycle, setClockCycle] = useState(0);
 // const Queue=useQueue(parser.parseFile(code));
/*   const [currentInstruction, setCurrentInstruction] = useState<string>( '');
  const [logs,setLogs]=useState<logType[] >([]);
  const [registerFile,setRegisterFile]=useState<typeof RegisterFile>(RegisterFile);
  const [addReservationStations,setAddReservationStations]=useState(AddReservationStations);
  const [mulReservationStations,setMulReservationStations]=useState(MulReservationStations);
  const [loadBuffers,setLoadBuffers]=useState(LoadBuffers);
  const [storeBuffers,setStoreBuffers]=useState(StoreBuffers);
  const [memoryArray,setMemoryArray]=useState<number[]>(MemoryArray); */
  const [status,setStatus]=useState<STATUS>(STATUS.FETCHING);

  const [cycleTable,setCycleTable]=useState<cycleTableType[]>([]);
  

  const [state,setState]=useState(
    {
      initialLength:parser.parseFile(code).length,
      queue:parser.parseFile(code),
      clockCycle:0,
      currentInstruction:'',
      logs:[],
      latency: {'ADD.D': 4,
      "SUB.D":3,
      "MUL.D":4,
      "DIV.D":5,
      "L.D":5,
      "S.D":1},
      registerFile:RegisterFile,
      addReservationStations:[1,1,1].map((_, i) => {
        return {
            name: 'A' + i,
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
        }}),
      mulReservationStations:MulReservationStations,
      loadBuffers:LoadBuffers,
      storeBuffers:StoreBuffers,
      memoryArray:MemoryArray,
      status:STATUS.FETCHING,
      cycleTable:(new Array(parser.parseFile(code).length)).fill(1).map(()=>{
        return {
          instruction:null,
          timeLeft:null,
          instructionIndex:null,
          issueCycle:null,
          startExecuteCycle:null,
          endExecute:null,
          writeResultCycle:null
        }
      }),

      
    }
  );


  useEffect(() => {
  }, [state]);


const Queue={
  queue:state.queue,
   async enqueue (item:string)  {
    if(!item || item.trim() === ''){
        return;
    }
   await setState((prev)=>{return{...prev,queue:[...state.queue, item]}});
}
, async enqueueQueue(records:string[]){
const cleanedRecords= records.map((record,index)=>{

    if(!record || record.trim() === ''){
        return '';
    }
    return record;
})

console.log(cleanedRecords);
await setState((prev)=>{return{...prev,queue:[...state.queue, ...cleanedRecords]}});

}


, async removeItemByIndex(index:number){
    const newQueue = state.queue.filter((_, i) => i !== index);
  await  setState((prev)=>{return{...prev,queue:[...state.queue, ...newQueue]}});
  }

, async dequeue(){
    const item = state.queue[0];
   await setState((prev)=>{return{...prev,queue:[ ...state.queue.slice(1).map(data=>
    data
   )]}});

    return item;
}

, print() {
    console.log('Clock Cycle');
    console.log('The instruction queue');
    console.log(this.records);
}
, peek() {
    return state.queue[0];
}

, length() {
    return state.queue.length;
}
}

async function setLatency(currlatency){
  await setState((prev)=>{return{...prev,latency:currlatency}});
}
 async function setMemoryArray1(reservations:number[],instruction:(string|null),timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null)){
  const currentInstanceCycleTable=state.cycleTable[state.initialLength-instructionIndex];
state.cycleTable[state.initialLength-instructionIndex]={
  instruction:instruction?instruction:currentInstanceCycleTable.instruction,
  timeLeft:timeLeft?timeLeft:currentInstanceCycleTable.timeLeft,
  instructionIndex:instructionIndex?instructionIndex:currentInstanceCycleTable.instructionIndex,
  issueCycle:issueCycle?issueCycle:currentInstanceCycleTable.issueCycle,
  startExecuteCycle:startExecuteCycle?startExecuteCycle:currentInstanceCycleTable.startExecuteCycle,
  endExecute:endExecute?endExecute:currentInstanceCycleTable.endExecute,
  writeResultCycle:writeResultCycle?writeResultCycle:currentInstanceCycleTable.writeResultCycle
};
  await  setState(prev=>{
      return {...prev,
        memoryArray:[...reservations.map(data=>data)],
        cycleTable:[...state.cycleTable.map(data=>data)]
      }
    }
    )
  }
  
async function setMulReservationStations1(reservations:ArithmeticReservationStation[],instruction:(string|null),timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null)){
  const currentInstanceCycleTable=state.cycleTable[state.initialLength-instructionIndex];

  state.cycleTable[state.initialLength-instructionIndex]={
    instruction:instruction?instruction:currentInstanceCycleTable.instruction,
    timeLeft:timeLeft?timeLeft:currentInstanceCycleTable.timeLeft,
    instructionIndex:instructionIndex?instructionIndex:currentInstanceCycleTable.instructionIndex,
    issueCycle:issueCycle?issueCycle:currentInstanceCycleTable.issueCycle,
    startExecuteCycle:startExecuteCycle?startExecuteCycle:currentInstanceCycleTable.startExecuteCycle,
    endExecute:endExecute?endExecute:currentInstanceCycleTable.endExecute,
    writeResultCycle:writeResultCycle?writeResultCycle:currentInstanceCycleTable.writeResultCycle
  };
    await  setState(prev=>{
      return {...prev,
        mulReservationStations:[...reservations.map(data=>{return{...data}})],
        cycleTable:[...state.cycleTable.map(data=>data)]
      }
    }
    )
  } 

async function setStoreBuffers1(reservations:StoreBuffer[],instruction:(string|null),timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null)){
  const currentInstanceCycleTable=state.cycleTable[state.initialLength-instructionIndex];

  state.cycleTable[state.initialLength-instructionIndex]={
    instruction:instruction?instruction:currentInstanceCycleTable.instruction,
    timeLeft:timeLeft?timeLeft:currentInstanceCycleTable.timeLeft,
    instructionIndex:instructionIndex?instructionIndex:currentInstanceCycleTable.instructionIndex,
    issueCycle:issueCycle?issueCycle:currentInstanceCycleTable.issueCycle,
    startExecuteCycle:startExecuteCycle?startExecuteCycle:currentInstanceCycleTable.startExecuteCycle,
    endExecute:endExecute?endExecute:currentInstanceCycleTable.endExecute,
    writeResultCycle:writeResultCycle?writeResultCycle:currentInstanceCycleTable.writeResultCycle
  }
    await setState(prev=>{
      return {...prev,
        storeBuffers:[...reservations.map(data=>{return{...data}})],
        cycleTable:[...state.cycleTable.map(data=>data)]
      }
    }
    );
  } 
  async function setLoadBuffers1(reservations:LoadBuffer[],instruction:(string|null),timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null)){
    const currentInstanceCycleTable=state.cycleTable[state.initialLength-instructionIndex];

    state.cycleTable[state.initialLength-instructionIndex]={
      instruction:instruction?instruction:currentInstanceCycleTable.instruction,
      timeLeft:timeLeft?timeLeft:currentInstanceCycleTable.timeLeft,
      instructionIndex:instructionIndex?instructionIndex:currentInstanceCycleTable.instructionIndex,
      issueCycle:issueCycle?issueCycle:currentInstanceCycleTable.issueCycle,
      startExecuteCycle:startExecuteCycle?startExecuteCycle:currentInstanceCycleTable.startExecuteCycle,
      endExecute:endExecute?endExecute:currentInstanceCycleTable.endExecute,
      writeResultCycle:writeResultCycle?writeResultCycle:currentInstanceCycleTable.writeResultCycle
    };
  await  setState(prev=>{
      return {...prev,
        loadBuffers:[...reservations.map(data=>{return{...data}})],
        cycleTable:[...state.cycleTable.map(data=>data)]
      }
    }
    )
  };

  async  function setAddReservationStations1(reservations:ArithmeticReservationStation[],instruction:(string|null),timeLeft:number,instructionIndex:number,issueCycle:(number|null),startExecuteCycle:(number|null),endExecute:(number|null),writeResultCycle:(number|null)){
    const currentInstanceCycleTable=state.cycleTable[state.initialLength-instructionIndex];

state.cycleTable[state.initialLength-instructionIndex]={
  instruction:instruction?instruction:currentInstanceCycleTable.instruction,
  timeLeft:timeLeft?timeLeft:currentInstanceCycleTable.timeLeft,
  instructionIndex:instructionIndex?instructionIndex:currentInstanceCycleTable.instructionIndex,
  issueCycle:issueCycle?issueCycle:currentInstanceCycleTable.issueCycle,
  startExecuteCycle:startExecuteCycle?  startExecuteCycle:currentInstanceCycleTable.startExecuteCycle,
  endExecute:endExecute?endExecute:currentInstanceCycleTable.endExecute,
  writeResultCycle:writeResultCycle?writeResultCycle:currentInstanceCycleTable.writeResultCycle
}
    await setState(prev=>{
      return {...prev,
        addReservationStations:[...reservations.map(data=>{return{...data}})],
        cycleTable:[...state.cycleTable.map(data=>data)]
      }
    }
    )
  }
  
  

   async function setClockCycle1(clockCycle:number){
   await setState(prev=>{
      return {...prev,
        clockCycle,
      }
    }
    )
  }  
 async function setCurrentInstruction1(currentInstruction:string){
   await setState(prev=>{
      return {...prev,
        currentInstruction,
      }
    }
    )
  }  
  async function setLogs1(log:logType){
  await  setState(prev=>{
      return {...prev,
        logs:[log,...prev.logs],
      }
    }
    )
  } 
  async function setRegisterFile1(registers:typeof RegisterFile){
  await  setState(prev=>{
      return {...prev,
        registerFile:[...registers],
      }
    }
    )
  }




 /*  function setDisplayMessage(displayMessage:logType){
    setLogs([displayMessage, ...logs]);
  }
  function setDisplayCurrentInstruction(instruction:string){
    setCurrentInstruction(instruction);
  } */
  async function nextClockCycle(){
  await main(state.clockCycle,
    Queue,
    state.latency,
    setCurrentInstruction1,
    setLogs1,
    setRegisterFile1,
    setAddReservationStations1,
    setMulReservationStations1,
    setLoadBuffers1,
    setStoreBuffers1,
    setMemoryArray1,
    state.registerFile,
    state.addReservationStations,
    state.mulReservationStations,
    state.loadBuffers,
    state.storeBuffers,
    state.memoryArray,
    status,
    setStatus,
    cycleTable,
    setCycleTable
    );

setClockCycle1(state.clockCycle+1);


}


  return (
    <div className="App">
      <h1>Micro Project</h1>
      <div className='body row'>
       {status ===STATUS.FETCHING &&
        (
          
          <Form
            setStatus={setStatus}
            latency={state.latency}
            setLatency={setLatency}
            setInstructionsValue={setInstructionsValue}
            instructionValue={instructionValue}
            Queue={Queue} />
      )
}

{/** table of logs */}
    
  { status !== STATUS.FETCHING && (<>
    <div className='col-10'>

<div className='d-flex'>
 <div className='py-5 d-flex flex-column gap-5'>
 {state.clockCycle>0 && <h2 className=''>Clock Cycle: {state.clockCycle}</h2>}
 <h5 className=''>Status of instruction queue: {status}</h5>

<button className='btn btn-primary btn-lg' style={{
  height:'50px'
}} onClick={() => {
  nextClockCycle();
 }}>{state.clockCycle>0? 'Next Clock Cycle':'Start ' }</button>

</div>
<div>

</div>
  {/** current instruction */}
<CurrentInstruction currentInstruction={state.currentInstruction}/>
<InstructionQueueTable Queue={Queue} removable={false}/>

<CycleTable cycleTable={state.cycleTable}/>



</div>
      
   
      <div className='d-flex '>
      <div className='d-flex flex-row gapx-1 flex-wrap'>
      <LatenciesTable latencies={state.latency}  />

      <AddReservationStationsTable addReservationStations={state.addReservationStations} />
   <MulReservationStationsTable mulReservationStations={state.mulReservationStations} />
  
      </div>  

      <div className='d-flex flex-row gapx-1 flex-wrap'>
      <LoadBuffersTable loadBuffers={state.loadBuffers}/>
   <StoreBuffersTable storeBuffers={state.storeBuffers}/>
</div>
</div>

      <div className='d-flex justify-content-center'>
    <RegisterFileTable registerFile={state.registerFile}/>
   <MemoryTable memoryArray={state.memoryArray}/> 

      </div>
   

  
    <div>
     {state.currentInstruction? <h2>Current Instruction: {state.currentInstruction}</h2>:<h2>Press Start </h2>}
      </div>

      <div className='d-flex justify-content-end px-3'>
       <h2 className='mx-5'>Clock Cycle: {state.clockCycle}</h2>


      <button className='btn btn-primary btn-lg' onClick={() => {
        nextClockCycle();
       }}> Next Clock Cycle</button>
       
      </div>
      </div> 
      <div className='col-2'>
      <LogTable logs={state.logs} clockCycle={state.clockCycle}/>
      </div>
       </>)
      } 
      
      </div> 
      
       </div>
  
  )

  
}

export default App
