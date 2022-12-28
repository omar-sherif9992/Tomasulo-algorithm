import React from 'react'
import {
   LoadBuffers,
}
from '../logic/Arrays'
function loadBuffersTable({loadBuffers}:{loadBuffers:typeof LoadBuffers}) {
    return <div className='m-5 d-flex flex-column justify-content-between'>
      <h3>Load Buffers</h3>
      <table className='table table-striped bg-light'>
        <thead>
          <tr>
          <th scope="col">Time</th>
            <th scope="col">Busy</th>
            <th scope="col">name</th>
            <th scope="col">Effective Address</th>
          </tr>
        </thead>
        <tbody>
          {loadBuffers.map((station, index) => (
            <tr key={index+232*32312}>
                <td>{station.timeLeft}</td>
                <td>{station.busy}</td>
                <td>{station.name}</td>                     
                <td>{station.effectiveAddress}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>;
  }
export default loadBuffersTable;