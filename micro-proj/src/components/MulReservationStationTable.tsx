import React from 'react'
import {
   MulReservationStations,
}
from '../logic/Arrays'
function MulReservationStationsTable({mulReservationStations}:{mulReservationStations:typeof MulReservationStations}) {
    return <div className='m-5 d-flex flex-column justify-content-between'>
      <h3>Mul Reservation Stations</h3>
      <table className='table table-striped bg-light'>
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Busy</th>
            <th scope="col">name</th>
            <th scope="col">Operand</th>
            <th scope="col">Vj</th>
            <th scope="col">Vk</th>
            <th scope="col">Qj</th>
            <th scope="col">Qk</th>
            <th scope="col">A</th>
          </tr>
        </thead>
        <tbody>
          {mulReservationStations.map((station, index) => (
            <tr key={index+232*32312}>
              <td>{station.timeLeft ===null?'-':station.timeLeft}</td>
              <td>{station.busy === true?'1':'0'}</td>
                <td>{station.name === null?'-':station.name}</td>
                <td>{station.op ===null?'-':station.op}</td>
                <td>{station.Vj ===null?'-':station.Vj}</td>
                <td>{station.Vk ===null?'-':station.Vk}</td>
                <td>{station.Qj===null?'-':station.Qj}</td>
                <td>{station.Qk===null?'-':station.Qk}</td>
                <td>{station.A ===null?'-':station.A}</td>             
            </tr>
          ))}
        </tbody>
      </table>
    </div>;
  }
export default MulReservationStationsTable;