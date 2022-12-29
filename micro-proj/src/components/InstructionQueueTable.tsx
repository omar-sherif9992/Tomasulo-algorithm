import React from 'react'
import { QueueType } from '../common/types'

function InstructionQueueTable({Queue,removable}:{Queue:QueueType,removable:boolean})  {
  return (
  <div className='m-5 d-flex flex-column justify-content-between'>
      <h3>Instruction Queue</h3>
      <table className='table table-striped shadow border bg-light'>
        <thead>
          <tr>
          <th scope="col" className='bg-light'>#</th>

            <th scope="col" className='bg-light'>Instruction</th>
           {removable && <th scope="col" className='bg-light'>remove</th>}
          </tr>
        </thead>
        <tbody>
          {Queue.queue.map((instruction, index) => (
            <tr key={index} >
              <td >{index+1}</td>
              <td >{instruction}</td>
              {removable && <td><button className='btn btn-danger' onClick={()=>Queue.removeItemByIndex(index)}>remove</button></td>}
            </tr>
          ))}
        </tbody>
      </table>
      </div>  )
}

export default InstructionQueueTable