export interface TallerApi {
    id: string;
    name: string;
    description: string;
    datetime: string;
    price: number;
    time?: {
        id: string;
        startTime: string;
    };
}