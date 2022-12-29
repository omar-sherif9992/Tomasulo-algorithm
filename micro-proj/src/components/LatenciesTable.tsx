import React from 'react';
import { latencyType } from '../common/types';


function LatenciesTable ({latencies}:{latencies:latencyType})  {
  return (
    <div className='m-5 d-flex flex-column justify-content-between'>
        <h3>Latencies</h3>
        <table className='table table-striped bg-light'>
            <thead>
                <tr>
                    <th scope="col">Latency</th>
                    <th scope="col">Value</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(latencies).map((key, index) => (
                        <tr key={index+3213*54}>
                            <td>{key}</td>
                            <td>{latencies[key]}</td>
                            </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default LatenciesTable;