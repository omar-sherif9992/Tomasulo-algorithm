import React from 'react'
import {
   StoreBuffers,
}
from '../logic/Arrays'
function storeBuffersTable({storeBuffers}:{storeBuffers:typeof StoreBuffers}) {
    return <div className='m-5 d-flex flex-column justify-content-between'>
      <h3>Store Buffers</h3>
      <table className='table table-striped bg-light table-hover shadow'>
        <thead>
          <tr>
          <th scope="col">Time</th>
            <th scope="col">Busy</th>
            <th scope="col">Name</th>
            <th scope="col">Effective address</th>
            <th scope="col">Value</th>
            <th scope="col">Q</th>

          </tr>
        </thead>
        <tbody>
          {storeBuffers.map((station, index) => (
            <tr key={index+232*32312}>
              <td>{station.timeLeft ===null?'-':station.timeLeft}</td>
              <td>{station.busy === true?'1':'0'}</td>
                <td>{station.name}</td>   
                <td>{station.effectiveAddress ===null?'-':station.effectiveAddress}</td> 
                <td>{station.value ===null?'-':station.value}</td> 
                <td>{station.Q ===null?'-':station.Q}</td> 
                
            </tr>
          ))}
        </tbody>
      </table>
    </div>;
  }
export default storeBuffersTable;