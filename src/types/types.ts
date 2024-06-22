// src/types/types.ts
export interface Operation {
    parentId: string;
    type: string;
    value: number;
    _id: string;
    __v: number;
  }
  
  export interface Calculation {
    _id: string;
    startingNumber: number;
    currentValue: number;
    operations: Operation[];
    __v: number;
  }  