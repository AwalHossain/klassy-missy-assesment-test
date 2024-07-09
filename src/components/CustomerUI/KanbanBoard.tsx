'use client';
import {
    Dialog,
    DialogTrigger
} from "@/components/ui/dialog";
import { PlusCircle, Trash2 } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { Card, Column } from '../../lib/types';
import { initialBoardData } from "../data/boardData";
import AddCardDialog from "../dialog/AddCardDialog";
import DeleteCardDialog from "../dialog/DeleteCardDialog";



const KanbanBoard: React.FC = () => {
    const [columns, setColumns] = useState<Column[]>(initialBoardData);
    const [addDialogInfo, setAddDialogInfo] = useState<{ isOpen: boolean; columnId: string } | null>(null);
    const [deleteDialogInfo, setDeleteDialogInfo] = useState<{ isOpen: boolean; columnId: string; cardId: string } | null>(null);
    useEffect(() => {
        const savedData = localStorage.getItem('kanbanData');
        if (savedData) {
            setColumns(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('kanbanData', JSON.stringify(columns));
    }, [columns]);

    const onDragEndHandler = (result: DropResult) => {
        const { source, destination } = result;

        // If there's no destination, we don't need to do anything
        if (!destination) return;

        // If the source and destination are the same, we don't need to do anything
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // Find the source and destination columns
        const sourceColumn = columns.find(col => col.id === source.droppableId);
        const destColumn = columns.find(col => col.id === destination.droppableId);

        if (!sourceColumn || !destColumn) return;

        // Create new array of cards for the source column
        const sourceCards = Array.from(sourceColumn.cards);
        // Remove the dragged card from the source column
        const [removedCard] = sourceCards.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            // If moving within the same column
            sourceCards.splice(destination.index, 0, removedCard);
            const newColumns = columns.map(col =>
                col.id === sourceColumn.id ? { ...col, cards: sourceCards } : col
            );
            setColumns(newColumns);
        } else {
            // If moving to a different column
            const destCards = Array.from(destColumn.cards);
            destCards.splice(destination.index, 0, removedCard);
            const newColumns = columns.map(col => {
                if (col.id === sourceColumn.id) {
                    return { ...col, cards: sourceCards };
                }
                if (col.id === destColumn.id) {
                    return { ...col, cards: destCards };
                }
                return col;
            });
            setColumns(newColumns);
        }
    };



    const editCard = (columnId: string, cardId: string, updatedCard: Card) => {
        setColumns(prevColumns =>
            prevColumns.map(col =>
                col.id === columnId
                    ? {
                        ...col,
                        cards: col.cards.map(card =>
                            card.id === cardId ? { ...card, ...updatedCard } : card
                        ),
                    }
                    : col
            )
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Client Regimen Request</h1>
            <DragDropContext onDragEnd={onDragEndHandler}>
                <div className="flex space-x-4">
                    {columns.map(column => (
                        <div key={column.id} className="flex-1 bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-2 flex justify-between items-center h-screen overflow-y-scroll">
                                {column.title}
                                <>
                                    <Dialog open={addDialogInfo?.isOpen} onOpenChange={(isOpen) => setAddDialogInfo(isOpen ? { isOpen, columnId: column.id } : null)}>
                                        <DialogTrigger>
                                            <PlusCircle className="w-6 h-6 text-green-500 hover:text-green-700" />
                                        </DialogTrigger>
                                        {addDialogInfo && (
                                            <AddCardDialog
                                                columnId={addDialogInfo.columnId}
                                                setColumns={setColumns}
                                                setIsDialogCardOpen={(isOpen) => setAddDialogInfo(isOpen ? addDialogInfo : null)}
                                            />
                                        )}
                                    </Dialog>

                                </>
                            </h2>
                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={`min-h-[500px] transition-colors duration-200 ${snapshot.isDraggingOver ? 'bg-blue-100' : ''
                                            }`}
                                    >
                                        {column.cards.map((card, index) => (
                                            <Draggable key={card.id} draggableId={card.id} index={index}>
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
                                                                    editCard(column.id, card.id, updatedCard);
                                                                }}
                                                                className="text-blue-500 hover:text-blue-700"
                                                            >
                                                                Edit
                                                            </button>
                                                            <Dialog open={deleteDialogInfo?.isOpen} onOpenChange={(isOpen) => setDeleteDialogInfo(isOpen ? { isOpen, columnId: column.id, cardId: card.id } : null)}>
                                                                <DialogTrigger>
                                                                    <Trash2 className="w-6 h-6 text-red-500 hover:text-red-700" />
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
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default KanbanBoard;