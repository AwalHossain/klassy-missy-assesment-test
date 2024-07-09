import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { moveCard } from '@/redux/kanbanSlice';
import Column from './Column';

const KanbanBoard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { columns } = useAppSelector((state) => state.kanban);

    console.log(columns, 'columns from kanban board');

    // useEffect(() => {
    //     const savedState = localStorage.getItem('kanbanState');
    //     if (savedState) {
    //         dispatch(setInitialState(JSON.parse(savedState)));
    //     }
    // }, [dispatch]);

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
        <div className="flex flex-col md:flex-row w-full h-full gap-4 p-4">
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.entries(columns).map(([columnId, column]) => (
                    <Column key={columnId} id={columnId} title={column.title} cards={column.cards} />
                ))}
            </DragDropContext>
        </div>
    );
};

export default KanbanBoard;