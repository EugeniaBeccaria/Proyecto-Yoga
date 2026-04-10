import type { User } from "./user.type.ts";

export interface Class {
    id?: string;
    name?: string;
    description?: string;
    capacityLimit?: number;
    users?: User[];
    room?: string;
    day?: string;
    professor?: string;
    time?: string;
}

export interface Rooms {
    id: string;
    name: string;
}

export interface Day {
    id: string;
    name: string;
}
export interface Time {
    id: string;
    startTime: string;
}

export interface SelectedClass {
    id: string;
    name: string; 
    description: string;
    capacityLimit: number;
    room: {
        id: string;
        name: string;
        };
    day: { 
        id: string;
        name: string;
    };
    professor: string;
    time: { 
        id: string;
        startTime: string;
    };
}

export interface IPlanGroup {
    id: string;
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