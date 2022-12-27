import { useState } from "react";

function useQueue(){
    const [queue, setQueue] = useState<string[]>([]);

    const addToQueue = (item) => {
        setQueue([...queue, item]);
    }

    const removeFromQueue = (item) => {
        setQueue(queue.filter((i) => i !== item));
    }

    const dequeue=()=>{
        setQueue(queue.slice(1));
    }

    return {queue, addToQueue, removeFromQueue}
}

export default useQueue;