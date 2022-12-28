import React from 'react'
import { QueueType } from '../common/types'

function InstructionQueueTable({Queue}:{Queue:QueueType})  {
  return (
  <div className='m-5 d-flex flex-column justify-content-between'>
      <h3>Instruction Queue</h3>
      <table className='table table-striped shadow border bg-light'>
        <thead>
          <tr>
          <th scope="col" className='bg-light'>#</th>

            <th scope="col" className='bg-light'>Instruction</th>
          </tr>
        </thead>
        <tbody>
          {Queue.queue.map((instruction, index) => (
            <tr key={index} >
              <td >{index+1}</td>
              <td >{instruction}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>  )
}

export default InstructionQueueTable