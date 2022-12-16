import { ArithmeticInstruction, MemoryInstruction, ArithmeticReservationStation } from './types';
import { AddReservationStations, MulReservationStations, LoadBuffers, StoreBuffers, RegisterFile, printStations } from "./Arrays";
import INSTRUCTION from './Instruction.enum'
const instructionSyntaxError = 'Syntax Error Instruction';

class Issuer {
    // if false meaning you need to stall instruction queue and not dequeue
    put(instruction: ArithmeticInstruction | MemoryInstruction): boolean {
        let stallFlag: boolean; 
        if (instruction.operation === INSTRUCTION.SD || instruction.operation === INSTRUCTION.LD) {
            stallFlag = this.issueMemoryInstruction(instruction as MemoryInstruction);
        } else if (instruction.operation === INSTRUCTION.ADD || instruction.operation === INSTRUCTION.SUB || instruction.operation === INSTRUCTION.MUL || instruction.operation === INSTRUCTION.DIV) {
            stallFlag = this.issueArithmeticInstruction(instruction as ArithmeticInstruction);
        }
        else {
            throw new Error(instructionSyntaxError);
        }
        printStations();
        // if !stallFlag true then we need to stall instruction queue dequeuing otherwise execute 
        return !stallFlag;
    }

    issueArithmeticInstruction(instruction: ArithmeticInstruction): boolean {
        let ReservationStation: ArithmeticReservationStation[];
        // to know which reservation station to go for
        if (instruction.operation === INSTRUCTION.ADD || instruction.operation === INSTRUCTION.SUB) {
            ReservationStation = AddReservationStations;
        }
        else if (instruction.operation === INSTRUCTION.MUL || instruction.operation === INSTRUCTION.DIV) {
            ReservationStation = MulReservationStations;
        }
        for (let stationSlot = 0; stationSlot < ReservationStation.length; stationSlot++) {
            if (!ReservationStation[stationSlot].busy) {

                ReservationStation[stationSlot] = {
                    name: ReservationStation[stationSlot].name, // the name of reservation station normally
                    busy: true,
                    op: instruction.operation,
                    Vj: RegisterFile[instruction.source1].reservationStageName ? null : RegisterFile[instruction.source1].value, // if the found register is reserved by reservation station then the value is null otherwise the value of the register
                    Vk: RegisterFile[instruction.source2].reservationStageName ? null : RegisterFile[instruction.source2].value,// if the found register is reserved by reservation station then the value is null otherwise the value of the register
                    Qj: RegisterFile[instruction.source1].reservationStageName ? RegisterFile[instruction.source1].reservationStageName : null,// if the found register is reserved by reservation station then the name of the reservation station otherwise null
                    Qk: RegisterFile[instruction.source2].reservationStageName ? RegisterFile[instruction.source2].reservationStageName : null,// if the found register is reserved by reservation station then the name of the reservation station otherwise null
                    A: 0
                };
                return true;
            }
        }
        return false;
    }



    issueMemoryInstruction(instruction: MemoryInstruction): boolean {
        if (instruction.operation === INSTRUCTION.SD) {
            for (let stationSlot = 0; stationSlot < StoreBuffers.length; stationSlot++) {
                if (!StoreBuffers[stationSlot].busy) {
                    StoreBuffers[stationSlot] = {
                        name: StoreBuffers[stationSlot].name,
                        busy: true,
                        effectiveAddress: instruction.effectiveAddress,
                        value: RegisterFile[instruction.register].reservationStageName ? null : RegisterFile[instruction.register].value,
                        Q: RegisterFile[instruction.register].reservationStageName ? RegisterFile[instruction.register].reservationStageName : null
                    };
                }
                return true;
            }
            return false;
        }
        else if ((instruction.operation) === INSTRUCTION.LD) {
            for (let stationSlot = 0; stationSlot < LoadBuffers.length; stationSlot++) {
                if (!LoadBuffers[stationSlot].busy) {
                    LoadBuffers[stationSlot] = {
                        name: LoadBuffers[stationSlot].name,
                        busy: true,
                        effectiveAddress: instruction.effectiveAddress
                    };
                    // make the according register stall for the this load
                    RegisterFile[instruction.register] = {
                        name: RegisterFile[instruction.register].name,
                        value: 0,
                        reservationStageName: LoadBuffers[stationSlot].name
                    }
                }
                return true;
            }
            return false;
        }

    }
}




export default Issuer;