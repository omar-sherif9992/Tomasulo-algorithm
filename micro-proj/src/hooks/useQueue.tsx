import { QueueType } from "../common/types";
import { useState } from "react";


function useQueue(instructions:string[]):QueueType{
    const [queue, setQueue] = useState<string[]>(instructions);

    

    const enqueue = (item:string) => {
        if(!item || item.trim() === ''){
            return;
        }
        setQueue([...queue, item]);
    }
    function enqueueQueue(records:string[]){
    const cleanedRecords= records.map((record,index)=>{

        if(!record || record.trim() === ''){
            return '';
        }
        return record;
    })

    console.log(cleanedRecords);

        setQueue([...queue, ...cleanedRecords]);
    }

    const dequeue=()=>{
        const item = queue[0];
        setQueue(queue.slice(1));
        return item;
    }
    function print() {
        console.log('Clock Cycle');
        console.log('The instruction queue');
        console.log(this.records);
    }
    function peek() {
        return queue[queue.length - 1];
    }
    function length() {
        return queue.length;
    }

    return {queue, enqueue,enqueueQueue,dequeue,print,peek,length};
}

export default useQueue;