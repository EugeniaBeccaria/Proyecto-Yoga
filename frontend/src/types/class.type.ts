import type { User } from "./user.type.ts";

export interface Class {
    id?: number;
    name?: string;
    description?: string;
    capacityLimit?: number;
    users?: User[];
    room?: number;
    day?: number;
    professor?: number;
    time?: number;
}

export interface Rooms {
    id: number;
    name: string;
}

export interface Day {
    id: number;
    name: string;
}
export interface Time {
    id: number;
    startTime: string;
}

export interface SelectedClass {
    id: number;
    name: string; 
    description: string;
    capacityLimit: number;
    room: {
        id: number;
        name: string;
        };
    day: { 
        id: number;
        name: string;
    };
    professor: number;
    time: { 
        id: number;
        startTime: string;
    };
}

export interface IPlanGroup {
    id: number;
    description: string;
    price: number;
    numOfClasses: number;
}

export interface IEnrolledClass {
    id: string | number;
    name: string;
    professorName: string;
    schedule: string;
    description: string;
}