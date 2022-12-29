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
import STATUS from './common/Status.enum';
import Form from './components/Form';


const parser = new Parser(()=>{},1);
function App() {

  const [clockCycle, setClockCycle] = useState(1);
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
  const [status,setStatus]=useState<STATUS>(STATUS.FETCHING);

  const [cycleTable,setCycleTable]=useState([]);

  const [latency,setLatency]=useState<latencyType>({
    'ADD.D': 1,
    "SUB.D":4,
    "MUL.D":5,
    "DIV.D":2,
    "L.D":3,
    "S.D":10,
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
    latency,
    setDisplayCurrentInstruction,
    setDisplayMessage,
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
    status,
    setStatus
    );

setClockCycle(clockCycle+1);


}


  return (
    <div className="App">
      <h1>Micro Project</h1>
      <div className='body row'>
       {status ===STATUS.FETCHING &&
        (
          
          <Form
          setStatus={setStatus}
          latency={latency}
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
 {clockCycle>0 && <h2 className=''>Clock Cycle: {clockCycle}</h2>}
 <h5 className=''>Status of instruction queue: {status}</h5>

<button className='btn btn-primary btn-lg' style={{
  height:'50px'
}} onClick={() => {
  nextClockCycle();
 }}>{clockCycle>0? 'Next Clock Cycle':'Start ' }</button>

</div>
<div>

</div>
  {/** current instruction */}
<CurrentInstruction currentInstruction={currentInstruction}/>
<InstructionQueueTable Queue={Queue} removable={false}/>

 



</div>
      
   
      
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

      <div className='d-flex justify-content-end px-3'>
       <h2 className='mx-5'>Clock Cycle: {clockCycle}</h2>


      <button className='btn btn-primary btn-lg' onClick={() => {
        nextClockCycle();
       }}> Next Clock Cycle</button>
       
      </div>
      </div> 
      <div className='col-2'>
      <LogTable logs={logs} clockCycle={clockCycle}/>
      </div>
       </>)
      } 
      
      </div> 
      
       </div>
  
  )

  
}

export default App
