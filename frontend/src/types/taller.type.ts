export interface TallerApi {
    id: string;
    name: string;
    description: string;
    datetime: string;
    price: number;
    users?: Array<{
        id: string;
    }>;
    time?: {
        id: string;
        startTime: string;
    };
}