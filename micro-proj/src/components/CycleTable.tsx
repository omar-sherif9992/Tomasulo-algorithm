import React from 'react'
import { cycleTableType } from '../common/types'

function CycleTable  ({cycleTable}:{
    cycleTable:cycleTableType[]
}) {
    return <div className='m-5 d-flex flex-column justify-content-between'>
    <h3>Cycle Table</h3>
    <table className='table table-striped bg-light table-hover'>
      <thead>
        <tr>
        <th scope="col">Time</th>
            <th scope="col">Instruction</th>
            <th scope="col">Issue</th>
            <th scope="col">Start Execute</th>
            <th scope="col">End Execute</th>
            <th scope="col">Write Result</th>
        </tr>
      </thead>
      <tbody>
        {cycleTable.map((cycle, index) => (
          <tr key={index+232*32312}>
              <td>{cycle.instruction ===null?'-':cycle.instruction}</td>
              <td>{cycle.issueClockCycleNumber ===null?'-':cycle.issueClockCycleNumber }</td>
              <td>{cycle.executeStartClockCycleNumber ===null?'-':cycle.executeStartClockCycleNumber }</td>
              <td>{cycle.executeEndClockCycleNumber ===null?'-':cycle.executeEndClockCycleNumber}</td>
              <td>{cycle.writeBackClockCycleNumber ===null?'-':cycle.writeBackClockCycleNumber}</td>         
          </tr>
        ))}
      </tbody>
    </table>
  </div>;
}

export default CycleTable;