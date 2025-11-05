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