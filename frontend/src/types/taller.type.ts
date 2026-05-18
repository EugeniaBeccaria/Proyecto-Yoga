export interface TallerApi {
    id: string;
    name: string;
    description: string;
    datetime: string;
    price: number;
    cupo: number;
    users?: Array<{
        id: string;
        name: string;
        lastname: string;
        email: string;
    }>;
    time?: {
        id: string;
        startTime: string;
    };
    room: {
        id: string;
        name: string;
    };
    professor: {
        id: string;
        name: string;
        lastname: string;
    }
}