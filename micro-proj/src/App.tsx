import React from 'react';
import { useState } from 'react'
import main from './logic/Main';
import Parser from './logic/Parser';
import code from './assembly/input'

const parser = new Parser();
function App() {

  const [clockCycle, setClockCycle] = useState(0);
  const[instructionQueue,setInstructionQueue]=useState(parser.parseFile(code));
  const [currentInstruction, setCurrentInstruction] = useState( instructionQueue.peek());

  main(clockCycle,instructionQueue);


  return (
    <div className="App">
      <h1>Micro Project</h1>
      <div className='body'>
        <div className='d-flex flex-column justify-content-between'>
          <div>
      <h2>Current Instruction: {currentInstruction}</h2>
      <h2>Clock Cycle: {clockCycle}</h2>
      </div>
<div className='d-flex justify-content-end'>
      <button className='btn btn-primary btn-lg' onClick={() => setClockCycle(clockCycle + 1)}>Next Clock Cycle</button>
      </div>
       </div>
      </div> 
       </div>
  )
}

export default App
