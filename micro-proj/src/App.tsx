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

const parser = new Parser();
function App() {

  const [clockCycle, setClockCycle] = useState(0);
  const Queue=useQueue(parser.parseFile(code));
  const [currentInstruction, setCurrentInstruction] = useState<string>( '');
  const [logs,setLogs]=useState<string[] >([]);
  const [instructionValue,setInstructionsValue]=useState('');
  const [registerFile,setRegisterFile]=useState<typeof RegisterFile>(RegisterFile);
  const [addReservationStations,setAddReservationStations]=useState(AddReservationStations);
  const [mulReservationStations,setMulReservationStations]=useState(MulReservationStations);
  const [loadBuffers,setLoadBuffers]=useState(LoadBuffers);
  const [storeBuffers,setStoreBuffers]=useState(StoreBuffers);
  const [memoryArray,setMemoryArray]=useState<number[]>(MemoryArray);
  console.log(memoryArray);


  function setDisplayMessage(displayMessage:string){
    setLogs([displayMessage, ...logs]);
  }
  function setDisplayCurrentInstruction(instruction:string){
    setCurrentInstruction(instruction);
  }
  function nextClockCycle(){
    if(Queue.length()>0){
  main(clockCycle,Queue,setDisplayCurrentInstruction,setDisplayMessage);
}
setClockCycle(clockCycle+1);


}


  return (
    <div className="App">
      <h1>Micro Project</h1>
      <div className='body'>
        <div className='d-flex flex-row justify-content-between'>
       {clockCycle ===0 && 
       (<div className='m-5 d-flex flex-column justify-content-between'>
          <h3>Enter Your instructions :</h3>
          
        <input type='text' value={instructionValue} onChange={(e)=>setInstructionsValue(e.target.value)}/>
      </div>)
}
<InstructionQueueTable Queue={Queue}/>

{/** table of logs */}
      <div className='m-5 d-flex flex-column justify-content-between'>
      <h3>Logs</h3>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope="col">Clock Cycle</th>
            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <th scope="row">{clockCycle - index}</th>
              <td>{log}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
      
      <div className='d-flex flex-row justify-content-between'>
    
      {/** current instruction */}
      <CurrentInstruction currentInstruction={currentInstruction}/>
   
      </div> 
      <div className='d-flex flex-row justify-content-evenly'>
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
       }}>{clockCycle>0? 'Next Clock Cycle':'Start ' }</button>
       
      </div>
      </div> 
       </div>
      
  )

  
}

export default App
