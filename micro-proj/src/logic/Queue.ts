class Queue {
    records=[];
    constructor(records: string[]) {
        this.records = records;
    }

    enqueue(record) {
        this.records.unshift(record);
    }

    dequeue() {
        return this.records.pop();
    }

    peek() {
        return this.records[this.records.length - 1];
    }
    length(){
        return this.records.length;
    }
    print() {
        console.log('The queue records are -', this.records);
    }
}

export default Queue;