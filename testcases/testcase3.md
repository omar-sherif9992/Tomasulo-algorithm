Enter latency ADD: 
2
Enter latency SUB: 
2
Enter latency MUL: 
2
Enter latency DIV: 
2
Enter latency LOAD: 
2
Enter latency STORE: 
2
Enter Number of ADD Reservation Stations
2
Enter Number of MUL Reservation Stations
2
Enter Number of LOAD Buffers
2
Enter Number of Store Buffers
2
Enter Memory Size
100000
Clock Cycle 1
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[L.D F6, 120, ADD.D F7, F6, F5, MUL.D F6, F1, F2, MUL.D F6, F1, F2, DIV.D F7, F7, F2, MUL.D F7, F7, F2, S.D F7, 150, SUB.D F10,F7,F1]
S.D F6, 90 is issued at station/buffer S0

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  A0  | null | false | 0.0 | 0.0 | null | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  M0  | null | false | 0.0 | 0.0 | null | null | 
0   |  M1  | null | false | 0.0 | 0.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
0   |  L0  | false | 0
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
2   | S0   | true  | 6.0 | null | 90
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 6.0, null), (F7= 7.0, null), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, null), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------

Clock Cycle 2
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[ADD.D F7, F6, F5, MUL.D F6, F1, F2, MUL.D F6, F1, F2, DIV.D F7, F7, F2, MUL.D F7, F7, F2, S.D F7, 150, SUB.D F10,F7,F1]
L.D F6, 120 is issued at station/buffer L0

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  A0  | null | false | 0.0 | 0.0 | null | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  M0  | null | false | 0.0 | 0.0 | null | null | 
0   |  M1  | null | false | 0.0 | 0.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
2   |  L0  | true  | 120
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
1   | S0   | true  | 6.0 | null | 90
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 6.0, L0), (F7= 7.0, null), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, null), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Buffer S0 is currently executing

Clock Cycle 3
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[MUL.D F6, F1, F2, MUL.D F6, F1, F2, DIV.D F7, F7, F2, MUL.D F7, F7, F2, S.D F7, 150, SUB.D F10,F7,F1]
ADD.D F7, F6, F5 is issued at station/buffer A0

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
2   |  A0  | ADD  | true  | 0.0 | 5.0 | L0 | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  M0  | null | false | 0.0 | 0.0 | null | null | 
0   |  M1  | null | false | 0.0 | 0.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
1   |  L0  | true  | 120
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
0   | S0   | true  | 6.0 | null | 90
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 6.0, L0), (F7= 7.0, A0), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, null), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Buffer L0 is currently executing
Buffer S0 finished execution and has saved in the memory location 90 value= 6.0

Clock Cycle 4
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[MUL.D F6, F1, F2, DIV.D F7, F7, F2, MUL.D F7, F7, F2, S.D F7, 150, SUB.D F10,F7,F1]
MUL.D F6, F1, F2 is issued at station/buffer M0

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
2   |  A0  | ADD  | true  | 0.0 | 5.0 | L0 | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
2   |  M0  | MUL  | true  | 1.0 | 2.0 | null | null | 
0   |  M1  | null | false | 0.0 | 0.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
0   |  L0  | true  | 120
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
0   | S0   | false | 0.0 | null | 0
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 6.0, M0), (F7= 7.0, A0), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, null), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Buffer L0 finished execution and output is 120.0
Buffer S0 is now emptied out

Clock Cycle 5
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[DIV.D F7, F7, F2, MUL.D F7, F7, F2, S.D F7, 150, SUB.D F10,F7,F1]
MUL.D F6, F1, F2 is issued at station/buffer M1

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
2   |  A0  | ADD  | true  | 120.0 | 5.0 | null | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
1   |  M0  | MUL  | true  | 1.0 | 2.0 | null | null | 
2   |  M1  | MUL  | true  | 1.0 | 2.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
0   |  L0  | false | 0
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
0   | S0   | false | 0.0 | null | 0
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 6.0, M1), (F7= 7.0, A0), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, null), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Station M0 is currently executing
Load Buffer L0 has written 120.0 on the bus and is emptied out

Clock Cycle 6
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[DIV.D F7, F7, F2, MUL.D F7, F7, F2, S.D F7, 150, SUB.D F10,F7,F1]
No instructions issued in this cycle

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
1   |  A0  | ADD  | true  | 120.0 | 5.0 | null | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  M0  | MUL  | true  | 1.0 | 2.0 | null | null | 
1   |  M1  | MUL  | true  | 1.0 | 2.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
0   |  L0  | false | 0
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
0   | S0   | false | 0.0 | null | 0
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 6.0, M1), (F7= 7.0, A0), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, null), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Station A0 is currently executing
Station M0 finished execution and output is 2.0
Station M1 is currently executing

Clock Cycle 7
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[DIV.D F7, F7, F2, MUL.D F7, F7, F2, S.D F7, 150, SUB.D F10,F7,F1]
No instructions issued in this cycle

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  A0  | ADD  | true  | 120.0 | 5.0 | null | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  M0  | null | false | 0.0 | 0.0 | null | null | 
0   |  M1  | MUL  | true  | 1.0 | 2.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
0   |  L0  | false | 0
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
0   | S0   | false | 0.0 | null | 0
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 6.0, M1), (F7= 7.0, A0), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, null), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Station A0 finished execution and output is 125.0
Station M1 finished execution and output is 2.0
Station M0 has written 2.0 on the bus and is emptied out

Clock Cycle 8
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[MUL.D F7, F7, F2, S.D F7, 150, SUB.D F10,F7,F1]
DIV.D F7, F7, F2 is issued at station/buffer M0

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  A0  | null | false | 0.0 | 0.0 | null | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
2   |  M0  | DIV  | true  | 125.0 | 2.0 | null | null | 
-1   |  M1  | MUL  | true  | 1.0 | 2.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
0   |  L0  | false | 0
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
0   | S0   | false | 0.0 | null | 0
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 6.0, M1), (F7= 7.0, M0), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, null), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Station A0 has written 125.0 on the bus and is emptied out

Clock Cycle 9
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[MUL.D F7, F7, F2, S.D F7, 150, SUB.D F10,F7,F1]
No instructions issued in this cycle

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  A0  | null | false | 0.0 | 0.0 | null | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
1   |  M0  | DIV  | true  | 125.0 | 2.0 | null | null | 
0   |  M1  | null | false | 0.0 | 0.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
0   |  L0  | false | 0
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
0   | S0   | false | 0.0 | null | 0
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 2.0, null), (F7= 7.0, M0), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, null), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Station M0 is currently executing
Station M1 has written 2.0 on the bus and is emptied out

Clock Cycle 10
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[S.D F7, 150, SUB.D F10,F7,F1]
MUL.D F7, F7, F2 is issued at station/buffer M1

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  A0  | null | false | 0.0 | 0.0 | null | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  M0  | DIV  | true  | 125.0 | 2.0 | null | null | 
2   |  M1  | MUL  | true  | 0.0 | 2.0 | M0 | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
0   |  L0  | false | 0
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
0   | S0   | false | 0.0 | null | 0
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 2.0, null), (F7= 7.0, M1), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, null), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Station M0 finished execution and output is 62.5

Clock Cycle 11
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[SUB.D F10,F7,F1]
S.D F7, 150 is issued at station/buffer S0

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  A0  | null | false | 0.0 | 0.0 | null | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  M0  | null | false | 0.0 | 0.0 | null | null | 
2   |  M1  | MUL  | true  | 62.5 | 2.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
0   |  L0  | false | 0
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
2   | S0   | true  | 2.0 | null | 150
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 2.0, null), (F7= 7.0, M1), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, null), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Station M0 has written 62.5 on the bus and is emptied out

Clock Cycle 12
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[]
SUB.D F10,F7,F1 is issued at station/buffer A0

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
2   |  A0  | SUB  | true  | 0.0 | 1.0 | M1 | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  M0  | null | false | 0.0 | 0.0 | null | null | 
1   |  M1  | MUL  | true  | 62.5 | 2.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
0   |  L0  | false | 0
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
1   | S0   | true  | 2.0 | null | 150
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 2.0, null), (F7= 7.0, M1), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, A0), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Station M1 is currently executing
Buffer S0 is currently executing

Clock Cycle 13
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[]
No instructions issued in this cycle

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
2   |  A0  | SUB  | true  | 0.0 | 1.0 | M1 | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  M0  | null | false | 0.0 | 0.0 | null | null | 
0   |  M1  | MUL  | true  | 62.5 | 2.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
0   |  L0  | false | 0
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
0   | S0   | true  | 2.0 | null | 150
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 2.0, null), (F7= 7.0, M1), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, A0), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Station M1 finished execution and output is 125.0
Buffer S0 finished execution and has saved in the memory location 150 value= 2.0

Clock Cycle 14
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[]
No instructions issued in this cycle

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
2   |  A0  | SUB  | true  | 125.0 | 1.0 | null | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  M0  | null | false | 0.0 | 0.0 | null | null | 
0   |  M1  | null | false | 0.0 | 0.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
0   |  L0  | false | 0
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
0   | S0   | false | 0.0 | null | 0
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 2.0, null), (F7= 125.0, null), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, A0), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Buffer S0 is now emptied out
Station M1 has written 125.0 on the bus and is emptied out

Clock Cycle 15
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[]
No instructions issued in this cycle

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
1   |  A0  | SUB  | true  | 125.0 | 1.0 | null | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  M0  | null | false | 0.0 | 0.0 | null | null | 
0   |  M1  | null | false | 0.0 | 0.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
0   |  L0  | false | 0
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
0   | S0   | false | 0.0 | null | 0
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 2.0, null), (F7= 125.0, null), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, A0), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Station A0 is currently executing

Clock Cycle 16
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[]
No instructions issued in this cycle

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  A0  | SUB  | true  | 125.0 | 1.0 | null | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  M0  | null | false | 0.0 | 0.0 | null | null | 
0   |  M1  | null | false | 0.0 | 0.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
0   |  L0  | false | 0
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
0   | S0   | false | 0.0 | null | 0
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 2.0, null), (F7= 125.0, null), (F8= 8.0, null), (F9= 9.0, null), (F10= 10.0, A0), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Station A0 finished execution and output is 124.0

Clock Cycle 17
------------------------------------
------------------------------------

Instruction Queue
------------------------------------
[]
No instructions issued in this cycle

Add Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  A0  | null | false | 0.0 | 0.0 | null | null | 
0   |  A1  | null | false | 0.0 | 0.0 | null | null | 

MUL Reservation Station
------------------------------------
Time| name | Type | Busy  | Vj  | Vk  | Qj   | Qk
0   |  M0  | null | false | 0.0 | 0.0 | null | null | 
0   |  M1  | null | false | 0.0 | 0.0 | null | null | 

Load Buffers
------------------------------------
Time| name | Busy  | effectiveAddress
0   |  L0  | false | 0
0   |  L1  | false | 0

Store Buffers
------------------------------------
Time| name | Busy  |  V  |  Q   | effectiveAddress
0   | S0   | false | 0.0 | null | 0
0   | S1   | false | 0.0 | null | 0

Register File
------------------------------------
[(F0= 0.0, null), (F1= 1.0, null), (F2= 2.0, null), (F3= 3.0, null), (F4= 4.0, null), (F5= 5.0, null), (F6= 2.0, null), (F7= 125.0, null), (F8= 8.0, null), (F9= 9.0, null), (F10= 124.0, null), (F11= 11.0, null), (F12= 12.0, null), (F13= 13.0, null), (F14= 14.0, null), (F15= 15.0, null), (F16= 16.0, null), (F17= 17.0, null), (F18= 18.0, null), (F19= 19.0, null), (F20= 20.0, null), (F21= 21.0, null), (F22= 22.0, null), (F23= 23.0, null), (F24= 24.0, null), (F25= 25.0, null), (F26= 26.0, null), (F27= 27.0, null), (F28= 28.0, null), (F29= 29.0, null), (F30= 30.0, null), (F31= 31.0, null)]

Logs
------------------------------------
Station A0 has written 124.0 on the bus and is emptied out


Process finished with exit code 0
