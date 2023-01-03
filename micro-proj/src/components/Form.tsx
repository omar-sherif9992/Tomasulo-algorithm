import React from 'react'
import { Prev } from 'react-bootstrap/esm/PageItem';
import STATUS from '../common/Status.enum';
import { latencyType, QueueType } from '../common/types'
import Parser from '../logic/Parser';
import InstructionQueueTable from './InstructionQueueTable';
import LatenciesTable from './LatenciesTable';
const parser = new Parser(()=>{},1);

function Form ({instructionValue,setInstructionsValue,Queue,latency,setLatency,setStatus}:{
    instructionValue:string,
    setInstructionsValue:React.Dispatch<React.SetStateAction<string>>,
    Queue:QueueType,
    latency:latencyType,
    setLatency:(curr:latencyType)=>void,
    setStatus:React.Dispatch<React.SetStateAction<STATUS>>
    
})  {
  return (
    <div className=''>
    <div className='m-5 d-flex flex-column justify-content-between'>
   <div className='row'>
   <label htmlFor="latency" className='form-label'>Enter Your instructions :</label>

    <div className='col-10'>
  <textarea 
  className='form-control'
  value={instructionValue} onChange={(e)=>{
    setInstructionsValue(e.target.value);
    
  }}/>
  
  </div>
            <div className='col-2'>

  <button className='btn btn-primary btn-lg' onClick={()=>{  
    Queue.enqueueQueue(parser.parseFile(instructionValue));
    setInstructionsValue('');
  }}>Add</button>
  </div>
  {/*inputs for latencies*/}
    <div className='col-4 my-5'>
    <label htmlFor="addlatency" className='form-label'>Latency of Add instructions</label>
    <input type="number" className='form-control' id='latency' value={latency['ADD.D']} onChange={(e)=>{
              setLatency({
                ...latency,
                'ADD.D': parseInt(e.target.value)
        })}}
    />

    </div>


    <div className='col-4 my-5'>
    <label htmlFor="addlatency" className='form-label'>Latency of Subtract instructions</label>
    <input type="number" className='form-control' id='latency' value={latency['SUB.D']} onChange={(e)=>{
        setLatency({
            ...latency,
              'SUB.D': parseInt(e.target.value)
    })}}
    />
    
    </div>
    <div className='col-4 my-5'>
    <label htmlFor="addlatency" className='form-label'>Latency of Multiply instructions</label>
    <input type="number" className='form-control' id='latency' value={latency['MUL.D']} onChange={(e)=>{
            setLatency({
              ...latency,
              'MUL.D': parseInt(e.target.value)
      })}}
  
    />
    
    </div>
    <div className='col-4 my-5'>
    <label htmlFor="addlatency" className='form-label'>Latency of Divide instructions</label>
    <input type="number" className='form-control' id='latency' value={latency['DIV.D']} onChange={(e)=>{
                setLatency({
                  ...latency,
                  'DIV.D': parseInt(e.target.value)
          })}}
 
    />
    
    </div>

    <div className='col-4 my-5'>
    <label htmlFor="loadlatency" className='form-label'>Latency of Load instructions</label>
    <input type="number" className='form-control' id='loadlatency' value={latency['L.D']} onChange={(e)=>{
                     setLatency({
                      ...latency,
                      'L.D': parseInt(e.target.value)
              })}}
 
    />
    
    </div>

    <div className='col-4 my-5'>
    <label htmlFor="storelatency" className='form-label'>Latency of Store instructions</label>
    <input type="number" className='form-control' id='storelatency' value={latency['S.D']} onChange={(e)=>{
                     setLatency({
                      ...latency,
                      'S.D': parseInt(e.target.value)
              })}}
    />
    
    </div>



  <div className='col-6'>
  <InstructionQueueTable Queue={Queue} removable={true}/>
    </div>
    <div className='col-6'>
    <LatenciesTable latencies={latency}/>
</div>
<div className='col-4 my-5'>
  <button className='btn btn-primary btn-lg' onClick={()=>{

    Queue.enqueueQueue(parser.parseFile(instructionValue));
    setStatus(STATUS.ACTIVE);
  }
  }>Start</button>
  </div>
  </div> 

</div>
</div>  )
}

export default Form