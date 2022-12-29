// Status of the instruction QUEUE
enum STATUS{
    ACTIVE = 'ACTIVE',
    STALL='STALL',
    EMPTY='EMPTY',
    FINISHED='FINISHED',
    CONFLICT='Load and store conflict',
    FETCHING='Filling Instruction Queue with instructions'
}
/* enum REASON{
    EMPTY='EMPTY',
    CONFLICT='Load and store conflict',
    DATA='Data hazard',
    CONTROL='Control hazard',
    NOSPACE='no free Reservation station'

} */


export default STATUS;