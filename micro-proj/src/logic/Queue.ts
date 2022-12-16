class Queue {
    records = [];
    constructor(records: string[]) {
        this.records = records;
        this.print()
    }

    enqueue(record) {
        this.records.unshift(record);
    }

    dequeue() {
        const record= this.records.pop();
        this.print();
        return record;
    }

    peek() {
        this.print();
        return this.records[this.records.length - 1];
    }
    length() {

        return this.records.length;
    }
    print() {
        console.log('Clock Cycle');
        console.log('The instruction queue');
        console.log(this.records);
    }
}

export default Queue;