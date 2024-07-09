import { KanbanCard } from '@/redux/types/kanbanTypes';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface CardProps {
    card: KanbanCard;
    index: number;
}

const Card: React.FC<CardProps> = ({ card, index }) => {
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white rounded-md shadow-sm p-3 mb-2"
                >
                    <h3 className="font-semibold">{card.regimen}</h3>
                    <p className="text-sm text-gray-600">{card.datetime}</p>
                    <p className="mt-1">{card.name}</p>
                </div>
            )}
        </Draggable>
    );
};

export default Card;