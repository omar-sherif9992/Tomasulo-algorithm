import { QueueType } from "../common/types";
import { useState } from "react";


function useQueue(instructions:string[]):QueueType{
    const [queue, setQueue] = useState<string[]>(instructions);

    const addToQueue = (item:string) => {
        setQueue([...queue, item]);
    }

    const removeFromQueue = (item) => {
        setQueue(queue.filter((i) => i !== item));
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

    return {queue, addToQueue, removeFromQueue,dequeue,print,peek,length};
}

export default useQueue;