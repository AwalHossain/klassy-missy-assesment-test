import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import useDragAndDrop from '@/hooks/useDragAndDrop';
import { useAppSelector } from '@/redux/hooks';
import Column from './Column';

const KanbanBoard: React.FC = () => {

    const { onDragEnd } = useDragAndDrop();
    const { columns } = useAppSelector((state) => state.kanban);

    console.log(columns, 'columns from kanban board');


    return (
        <div className="w-full p-4 overflow-x-auto md:overflow-x-visible">
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