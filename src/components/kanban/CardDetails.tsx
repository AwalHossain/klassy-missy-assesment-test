/* eslint-disable react/no-unescaped-entities */
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { useAppSelector } from "@/redux/hooks";
import { KanbanCard, KanbanState } from "@/redux/types/kanbanTypes";

// Updated selector function to find a card by ID
const selectCardById = (state: { kanban: KanbanState }, cardId: string): KanbanCard | undefined => {
    for (const column of Object.values(state.kanban.columns)) {
        const card = column.cards.find(c => c.id === cardId);
        if (card) return card;
    }
    return undefined;
};

export default function CardDetails({ id }: { id: string }) {
    const card = useAppSelector((state) => selectCardById(state, id));

    if (!card) {
        return (
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Card Not Found</DialogTitle>
                    <DialogDescription>
                        Sorry, we couldn't find the details for this card.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        );
    }

    // Helper function to safely format date
    const formatDate = (date: string | Date | undefined) => {
        if (!date) return 'N/A';
        const dateObj = date instanceof Date ? date : new Date(date);
        return isNaN(dateObj.getTime()) ? 'Invalid Date' : dateObj.toLocaleDateString('en-US');
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{card.regimen}</DialogTitle>
                <DialogDescription>
                    <p><strong>Date and Time:</strong> {card.datetime}</p>
                    <p><strong>Name:</strong> {card.name}</p>
                    <p><strong>Gender:</strong> {card.gender}</p>
                    <p><strong>DOB:</strong> {formatDate(card.DOB)}</p>
                    <p><strong>Concern:</strong> {card.concern}</p>
                    <p><strong>ConcernName:</strong> {card.concernName}</p>
                    <p><strong>EyeConcern:</strong> {card.eyeConcern}</p>
                    <p><strong>WrittenConcern:</strong> {card.writtenConcern}</p>
                    <p><strong>ID:</strong> {card.id}</p>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    );
}