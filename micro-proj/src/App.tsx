import React from 'react';
import { useState } from 'react'
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
import { latencyType, logType } from './common/types';
import AddReservationStationsTable from './components/AddReservationStationTable';
import MulReservationStationsTable from './components/MulReservationStationTable';
import LoadBuffersTable from './components/LoadBuffersTable';
import StoreBuffersTable from './components/StoreBuffersTable';
import INSTRUCTION from './common/Instruction.enum';

const parser = new Parser(()=>{},1);
function App() {

  const [clockCycle, setClockCycle] = useState(0);
  const Queue=useQueue(parser.parseFile(code));
  const [currentInstruction, setCurrentInstruction] = useState<string>( '');
  const [logs,setLogs]=useState<logType[] >([]);
  const [instructionValue,setInstructionsValue]=useState('');
  const [registerFile,setRegisterFile]=useState<typeof RegisterFile>(RegisterFile);
  const [addReservationStations,setAddReservationStations]=useState(AddReservationStations);
  const [mulReservationStations,setMulReservationStations]=useState(MulReservationStations);
  const [loadBuffers,setLoadBuffers]=useState(LoadBuffers);
  const [storeBuffers,setStoreBuffers]=useState(StoreBuffers);
  const [memoryArray,setMemoryArray]=useState<number[]>(MemoryArray);
  const [latency,setLatency]=useState<latencyType>({
    'ADD.D': 1,
    "SUB.D":4,
    "MUL.D":5,
    "DIV.D":2,
    "LD.D":3,
    "SD.D":10,
  });
  


  function setDisplayMessage(displayMessage:logType){
    setLogs([displayMessage, ...logs]);
  }
  function setDisplayCurrentInstruction(instruction:string){
    setCurrentInstruction(instruction);
  }
  function nextClockCycle(){
  main(clockCycle,
    Queue,
    setDisplayCurrentInstruction,
    setDisplayMessage,
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

setClockCycle(clockCycle+1);


}


  return (
    <div className="App">
      <h1>Micro Project</h1>
      <div className='body'>
        <div className='d-flex flex-row justify-content-between'>
       {clockCycle ===0 ?
       (<div className='m-5 d-flex flex-column justify-content-between'>
          <h3>Enter Your instructions :</h3>
          
        <input type='text' value={instructionValue} onChange={(e)=>setInstructionsValue(e.target.value)}/>
      </div>):
      <div className='d-flex'>
         <LogTable logs={logs} clockCycle={clockCycle}/>

 
      {/** current instruction */}
      <CurrentInstruction currentInstruction={currentInstruction}/>
      
   
       <div className='px-3'>
       <h2 className=''>Clock Cycle: {clockCycle}</h2>

      <button className='btn btn-primary btn-lg' style={{
        height:'50px'
      }} onClick={() => {
        nextClockCycle();
       }}>{clockCycle>0? 'Next Clock Cycle':'Start ' }</button>
       
      </div>
      </div>
}

{/** table of logs */}
    
      </div>
      { clockCycle>0 && (<>
<InstructionQueueTable Queue={Queue}/>

      
   
      
      <div className='d-flex flex-row gapx-1'>
      <AddReservationStationsTable addReservationStations={addReservationStations} />
   <MulReservationStationsTable mulReservationStations={mulReservationStations} />
   <LoadBuffersTable loadBuffers={loadBuffers}/>
   <StoreBuffersTable storeBuffers={storeBuffers}/>
      </div>  

      <div className='d-flex'>
    <RegisterFileTable registerFile={registerFile}/>
   <MemoryTable memoryArray={memoryArray}/> 

      </div>
   

  
    <div>
     {currentInstruction? <h2>Current Instruction: {currentInstruction}</h2>:<h2>Press Start </h2>}
      </div>
       </>)
      } 
          <div className='d-flex justify-content-end px-3'>
       <h2 className='mx-5'>Clock Cycle: {clockCycle}</h2>

      <button className='btn btn-primary btn-lg' onClick={() => {
        nextClockCycle();
       }}>{clockCycle>0? 'Next Clock Cycle':'Start ' }</button>
       
      </div>
      </div> 
       </div>
  
  )

  
}

export default App
