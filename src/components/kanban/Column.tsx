import { KanbanCard } from '@/redux/types/kanbanTypes';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import ColumnHeader from './ColumnHeader';


interface ColumnProps {
    id: string;
    title: string;
    cards: KanbanCard[];
}

const Column: React.FC<ColumnProps> = ({ id, title, cards }) => {
    console.log(cards, 'cards checkin');

    return (
        <div className="flex flex-col h-screen w-full md:w-1/3 bg-gray-100 rounded-lg shadow min-w-[300px] max-w-[90vw] md:min-w-0 md:max-w-none flex-shrink-0 md:flex-shrink md:flex-1">

            <ColumnHeader title={title} />
            <Droppable droppableId={id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex-1 p-2 overflow-y-auto"
                    >
                        {cards.map((card, index) => (
                            <Card key={card.id} card={card} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;