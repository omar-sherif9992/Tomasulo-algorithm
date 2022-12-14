import { ArithmeticInstruction, MemoryInstruction } from './types';
import { AddReservationStations, MulReservationStations, LoadBuffers, StoreBuffers, RegisterArray } from "./Arrays";

class Issuer {
    // if false meaning you need to stall instruction queue and not dequeue
    put(instruction: ArithmeticInstruction | MemoryInstruction): boolean {
        if (instruction.operation === 'S.D' || instruction.operation === 'L.D') {
            return this.issueMemoryInstruction(instruction as MemoryInstruction);
        } else {
            return this.issueArithmeticInstruction(instruction as ArithmeticInstruction);
        }
    }

    issueArithmeticInstruction(instruction: ArithmeticInstruction): boolean {
        if (instruction.operation === 'ADD.D' || instruction.operation === 'SUB.D') {
            for (let i = 0; i < AddReservationStations.length; i++) {
                if (!AddReservationStations[i].busy) {

                    AddReservationStations[i] = {
                        name: AddReservationStations[i].name,
                        busy: true,
                        op: instruction.operation,
                        Vj: RegisterArray[instruction.source1].reservationStage ? null : RegisterArray[i].value,
                        Vk: RegisterArray[instruction.source2].reservationStage ? null : RegisterArray[i].value,
                        Qj: RegisterArray[instruction.source1].reservationStage ? RegisterArray[instruction.source1].reservationStage : null,
                        Qk: RegisterArray[instruction.source2].reservationStage ? RegisterArray[instruction.source2].reservationStage : null,
                        A: 0
                    };
                    return true;
                }
            }
            return false;
        } else {
            for (let i = 0; i < MulReservationStations.length; i++) {
                if (!MulReservationStations[i].busy) {

                    MulReservationStations[i] = {
                        name: MulReservationStations[i].name,
                        busy: true,
                        op: instruction.operation,
                        Vj: RegisterArray[instruction.source1].reservationStage ? null : RegisterArray[i].value,
                        Vk: RegisterArray[instruction.source2].reservationStage ? null : RegisterArray[i].value,
                        Qj: RegisterArray[instruction.source1].reservationStage ? RegisterArray[instruction.source1].reservationStage : null,
                        Qk: RegisterArray[instruction.source2].reservationStage ? RegisterArray[instruction.source2].reservationStage : null,
                        A: 0
                    };
                    return true;
                }
            }
            return false;
        }
    }

    issueMemoryInstruction(instruction: MemoryInstruction) {
        if (instruction.operation === 'S.D') {
            for (let i = 0; i < StoreBuffers.length; i++) {
                if (!StoreBuffers[i].busy) {
                    StoreBuffers[i] = {
                        name: StoreBuffers[i].name,
                        busy: true,
                        address: instruction.address,
                        value: RegisterArray[instruction.address].reservationStage ? null : RegisterArray[i].value,
                        Q: RegisterArray[instruction.address].reservationStage ? RegisterArray[instruction.address].reservationStage : null
                    };

                };
                return true;
            }
        }
        return false;
    }

}




export default Issuer;