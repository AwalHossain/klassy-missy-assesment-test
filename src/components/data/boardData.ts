import { Column } from "@/lib/types";

export const initialBoardData: Column[] = [
    {
        id: 'incoming',
        title: 'Incoming Request',
        cards: [
            { id: '1', regimen: 'RGM1264', timestamp: '21:30:47, 4 June 2024', name: 'Fatima Ahmed' },
            { id: '2', regimen: 'RGM1255', timestamp: '01:30:47, 2 June 2024', name: 'Shorif Islam' },
        ],
    },
    {
        id: 'processing',
        title: 'Processing',
        cards: [
            { id: '3', regimen: 'RGM1264', timestamp: '11:30:47, 5 June 2024', name: 'Romana Akter' },
        ],
    },
    {
        id: 'done',
        title: 'Done | Updated',
        cards: [
            { id: '4', regimen: 'RGM1264', timestamp: '21:30:47, 01 June 2024', name: 'Samiera' },
        ],
    },
];