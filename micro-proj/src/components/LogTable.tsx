import React from 'react'
import { logType } from '../common/types'

function LogTable  ({logs,clockCycle}:{
    logs:logType[],
    clockCycle:number
})  {
  return (
    <div className='m-5 d-flex flex-column justify-content-between'>
    <h3>Logs</h3>
    <table className='table table-striped bg-light'>
      <thead>
        <tr>
          <th scope="col">Clock Cycle</th>
          <th scope="col">Message</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => (
          <tr key={index}>
            <th scope="row">{log.clockCycle}</th>
            <td>{log.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>  )
}

export default LogTable