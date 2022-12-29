import React from 'react'
import {
   AddReservationStations,
}
from '../logic/Arrays'
function AddReservationStationsTable({addReservationStations}:{addReservationStations:typeof AddReservationStations}) {
    return <div className='m-5 d-flex flex-column justify-content-between'>
      <h3>Add Reservation Stations</h3>
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
          {addReservationStations.map((station, index) => (
            <tr key={index+232*32312}>
                <td>{station.timeLeft}</td>
                <td>{station.busy === true?'1':'0'}</td>
                <td>{station.name}</td>
                <td>{station.op}</td>
                <td>{station.Vj}</td>
                <td>{station.Vk}</td>
                <td>{station.Qj}</td>
                <td>{station.Qk}</td>
                <td>{station.A}</td>             
            </tr>
          ))}
        </tbody>
      </table>
    </div>;
  }
export default AddReservationStationsTable;