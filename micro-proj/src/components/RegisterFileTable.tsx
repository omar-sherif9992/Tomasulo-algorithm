import React from 'react'
import {
   RegisterFile,
}
from '../logic/Arrays'
function RegisterFileTable({registerFile}:{registerFile:typeof RegisterFile}) {
    return <div className='m-5 d-flex flex-column justify-content-between'>
      <h3>Registers</h3>
      <table className='table table-striped bg-light table-hover shadow'>
        <thead>
          <tr>
            <th scope="col">Register</th>
            <th scope="col">Value</th>
            <th scope="col">Qi</th>
          </tr>
        </thead>
        <tbody>
          {registerFile.map((register, index) => (
            <tr key={index+232*32312}>
              <td>{register.name}</td>
              <td>{register.value === null ? '-':register.value}</td>
              <td>{register.reservationStageName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>;
  }
export default RegisterFileTable;