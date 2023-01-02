import React from 'react'

function CurrentInstruction({currentInstruction}:{
    currentInstruction:string
})  {
  return (
    <div className='m-5 d-flex flex-column justify-content-between'>
    <h3>Current Instruction</h3>
    <table className='table table-striped bg-light table-hover'>
      <thead>
        <tr>
          <th scope="col">Instruction</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{currentInstruction}</td>
        </tr>
      </tbody>
    </table>
    </div>  )
}

export default CurrentInstruction;