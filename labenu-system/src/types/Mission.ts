import { Student } from "./Student";
import { Teacher } from "./Teacher";

export enum SHIFTS {
   INTEGRAL = "INTEGRAL",
   NOTURNA = "NOTURNA"
}

export type Mission = {
   id: string,
   name: string,
   startDate: string,
   endDate: string
   teachers: Teacher[],
   students: Student[]
   module: number,
   shift: SHIFTS
}