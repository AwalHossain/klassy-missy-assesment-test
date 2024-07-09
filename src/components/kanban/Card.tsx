import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card as CardType, Column } from '../../lib/types';
import DeleteCardDialog from "../dialog/DeleteCardDialog";

interface CardProps {
    card: CardType;
    index: number;
    columnId: string;
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}

const Card: React.FC<CardProps> = ({ card, index, columnId, setColumns }) => {
    const [deleteDialogInfo, setDeleteDialogInfo] = useState<{ isOpen: boolean; columnId: string; cardId: string } | null>(null);

    const editCard = (updatedCard: CardType) => {
        setColumns(prevColumns =>
            prevColumns.map(col =>
                col.id === columnId
                    ? {
                        ...col,
                        cards: col.cards.map(c =>
                            c.id === card.id ? { ...c, ...updatedCard } : c
                        ),
                    }
                    : col
            )
        );
    };

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-white p-4 mb-2 rounded shadow transition-all duration-200 ${snapshot.isDragging ? 'shadow-lg' : ''
                        }`}
                >
                    <div className="font-semibold">{card.regimen}</div>
                    <div className="text-sm text-gray-500">{card.timestamp}</div>
                    <div>{card.name}</div>
                    <div className="mt-2 flex justify-end space-x-2">
                        <button
                            onClick={() => {
                                const updatedCard = { ...card, name: prompt('Enter new name', card.name) || card.name };
                                editCard(updatedCard);
                            }}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Edit
                        </button>
                        <Dialog open={deleteDialogInfo?.isOpen} onOpenChange={(isOpen) => setDeleteDialogInfo(isOpen ? { isOpen, columnId, cardId: card.id } : null)}>
                            <DialogTrigger>
                                <Trash2 className="w-4 h-6 text-red-500 hover:text-red-700" />
                            </DialogTrigger>
                            {deleteDialogInfo && (
                                <DeleteCardDialog
                                    columnId={deleteDialogInfo.columnId}
                                    cardId={deleteDialogInfo.cardId}
                                    setColumns={setColumns}
                                    setIsDeleteDialogCardOpen={(isOpen) => setDeleteDialogInfo(isOpen ? deleteDialogInfo : null)}
                                />
                            )}
                        </Dialog>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Card;