import React from 'react';


function MemoryTable ({memoryArray}:{memoryArray:number[]})  {
  return (
    <div className='m-5 d-flex flex-column justify-content-between'>
        <h3>Memory</h3>
        <table className='table table-striped bg-light table-hover shadow'>
            <thead>
                <tr>
                    <th scope="col">Effective Address</th>
                    <th scope="col">Value</th>
                </tr>
            </thead>
            <tbody>
                {memoryArray.map((value, index) => (        
                    <tr key={index+3213*54}>
                        <td>{index}</td>
                        <td>{value}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default MemoryTable