import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { moveCard } from '@/redux/kanbanSlice';
import Column from './Column';

const KanbanBoard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { columns } = useAppSelector((state) => state.kanban);

    console.log(columns, 'columns from kanban board');


    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (
            source.droppableId !== destination.droppableId ||
            source.index !== destination.index
        ) {
            dispatch(moveCard({
                sourceColumnId: source.droppableId,
                destinationColumnId: destination.droppableId,
                sourceIndex: source.index,
                destinationIndex: destination.index,
            }));
        }
    };

    return (
        <div className="w-full h-screen p-4 overflow-x-auto md:overflow-x-visible">
            <div className="inline-flex md:flex md:flex-wrap gap-4 min-w-full">
                <DragDropContext onDragEnd={onDragEnd}>
                    {Object.entries(columns).map(([columnId, column]) => (
                        <Column
                            key={columnId}
                            id={columnId}
                            title={column.title}
                            cards={column.cards}
                        />
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
};

export default KanbanBoard;