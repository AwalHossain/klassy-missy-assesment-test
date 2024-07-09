'use client';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import useDragAndDrop from '../../hooks/useDragAndDrop';
import { Column as ColumnType } from '../../lib/types';
import { initialBoardData } from "../data/boardData";
import Column from './Column';

const KanbanBoard: React.FC = () => {
    const [columns, setColumns] = useState<ColumnType[]>(initialBoardData);
    const { onDragEnd } = useDragAndDrop(columns, setColumns);

    useEffect(() => {
        const savedData = localStorage.getItem('kanbanData');
        if (savedData) {
            setColumns(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('kanbanData', JSON.stringify(columns));
    }, [columns]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Client Regimen Request</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex md:justify-between space-x-4 overflow-x-auto pb-4 px-10">
                    {columns.map(column => (
                        <Column key={column.id} column={column} setColumns={setColumns} />
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default KanbanBoard;